declare module 'next/server' {
  export class NextRequest extends Request {
    constructor(input: RequestInfo | URL, init?: RequestInit);
    nextUrl: URL;
  }
  export class NextResponse extends Response {
    static json<T = unknown>(body: T, init?: ResponseInit): NextResponse;
  }
}
