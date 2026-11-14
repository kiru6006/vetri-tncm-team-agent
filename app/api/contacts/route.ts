import { NextRequest, NextResponse } from 'next/server';
import { getAllContacts } from '@/lib/contacts/loader';
import { filterContacts, ContactFilters } from '@/lib/contacts/filter';
import { Category, VerificationStatus, UserRole } from '@/types/contacts';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const q = searchParams.get('q') || '';
    const categoryParam = searchParams.get('category');
    const districtParam = searchParams.get('district');
    const departmentParam = searchParams.get('department');
    const statusParam = searchParams.get('status');
    const serviceParam = searchParams.get('service');

    // Role detection from header / cookie / default to CM in demo
    const roleHeader = request.headers.get('x-user-role') as UserRole | null;
    const userRole: UserRole = roleHeader || 'CM';

    const filters: ContactFilters = {};
    if (categoryParam) {
      filters.category = categoryParam.split(',') as Category[];
    }
    if (districtParam) {
      filters.district = districtParam.split(',');
    }
    if (departmentParam) {
      filters.department = departmentParam.split(',');
    }
    if (statusParam) {
      filters.status = statusParam.split(',') as VerificationStatus[];
    }
    if (serviceParam) {
      filters.service = serviceParam.split(',');
    }

    const allContacts = getAllContacts();
    let filtered = filterContacts(allContacts, q, filters);

    // Defense-in-depth: Strip restricted communication channels for READONLY roles
    if (userRole === 'READONLY') {
      filtered = filtered.map((c) => ({
        ...c,
        office_email: null,
        office_phone: null,
        mobile: null,
      }));
    }

    // Find latest verified_on date
    const latestVerifiedOn = allContacts.reduce((latest, c) => {
      if (!latest || c.verified_on > latest) return c.verified_on;
      return latest;
    }, '');

    return NextResponse.json({
      success: true,
      data: filtered,
      total: filtered.length,
      latest_verified_on: latestVerifiedOn,
      user_role: userRole,
    });
  } catch (error) {
    console.error('API /api/contacts error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error fetching contacts' },
      { status: 500 }
    );
  }
}
