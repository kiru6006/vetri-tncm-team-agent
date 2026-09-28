# VETTRI TN AI OS — Kubernetes & Cloud Sovereign Deployment

> **System:** VETTRI TN AI OS (*வெற்றி*)  
> **Platform:** Kubernetes v1.30+ / Helm 3 / Tamil Nadu State Data Centre (TNSDC)  
> **Version:** 1.0.0

---

## 1. High-Availability Cluster Topology

```
                                [Internet / TNSWAN]
                                         │
                         ┌───────────────▼───────────────┐
                         │   HAProxy / Cloudflare WAF    │
                         └───────────────┬───────────────┘
                                         │
                         ┌───────────────▼───────────────┐
                         │   Ingress NGINX Controller    │
                         │   (TLS Termination & Certs)   │
                         └───────────────┬───────────────┘
                                         │
            ┌────────────────────────────┼────────────────────────────┐
            ▼                            ▼                            ▼
┌───────────────────────┐    ┌───────────────────────┐    ┌───────────────────────┐
│ Frontend Deployments  │    │ Backend API Pods      │    │ LangGraph Agent Pods  │
│ (3 Replicas + HPA)    │    │ (5 Replicas + HPA)    │    │ (3 GPU/CPU Replicas)  │
└───────────────────────┘    └───────────┬───────────┘    └───────────┬───────────┘
                                         │                            │
                                         └─────────────┬──────────────┘
                                                       │
                                     ┌─────────────────▼─────────────────┐
                                     │ State Data Layer (TNSDC Private)  │
                                     │ • PostgreSQL 16 Cluster + Patroni │
                                     │ • Redis Sentinel Cluster          │
                                     │ • MinIO Distributed S3 Cluster    │
                                     └───────────────────────────────────┘
```

---

## 2. Production Helm Chart Values & Resource Limits

```yaml
# infra/k8s/helm/vettri-aios/values.yaml
global:
  environment: production
  domain: vettri.tn.gov.in

backend:
  replicaCount: 5
  autoscaling:
    enabled: true
    minReplicas: 5
    maxReplicas: 30
    targetCPUUtilizationPercentage: 70
  resources:
    limits:
      cpu: 2000m
      memory: 4Gi
    requests:
      cpu: 500m
      memory: 1Gi

agents:
  replicaCount: 3
  resources:
    limits:
      cpu: 4000m
      memory: 8Gi
      nvidia.com/gpu: 1
```
