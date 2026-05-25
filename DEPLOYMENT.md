# Deployment

## GitHub

Repository:

```text
https://github.com/Pratikreddy/pratikreddy.com
```

Production branch:

```text
main
```

## Vercel Import

Use Vercel GitHub import and select `Pratikreddy/pratikreddy.com`.

Build settings:

```text
Framework preset: Next.js
Install command: npm install
Build command: npm run build
Output directory: .next
```

No required environment variables are needed for v1.

## Domain

Checked from this machine on 2026-05-25:

```text
pratikreddy.com A -> 3.33.130.190, 15.197.148.33
www.pratikreddy.com -> pratikreddy.com
```

Both currently return a small `/lander` redirect page, not this site.

After adding the domain to the Vercel project, run Vercel's domain inspector and use its exact records. The current general-purpose Vercel records documented for custom domains are:

```text
A     @     76.76.21.21
CNAME www   cname.vercel-dns-0.com
```

If Vercel shows a project-specific CNAME or TXT verification record, use the Vercel-provided value instead.
