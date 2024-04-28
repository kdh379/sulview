# SULVIEW

위스키를 좋아하는 사람들을 위한 위스키 리뷰 웹사이트입니다.

## 디자인 노트

- Next.js 14의 App Router와 RSC를 사용하였습니다.
- React-Hook-Form, Drizzle ORM, Zod를 사용하여 데이터를 처리하였습니다.
  - RSC의 경우 ServerAction, RCC는 React-Query를 이용하여 데이터를 처리합니다.
- Auth.js를 이용하여 사용자 인증이 처리됩니다.
- Tailwind, Shadcn UI를 사용하여 디자인을 구성하였습니다.
- 이미지는 webP로 변경되어 S3에 업로드됩니다.
  - 이미지 조회 시 CloudFront를 통해 제공됩니다.
- pnpm을 사용하여 패키지를 관리합니다.

## 개발 환경 셋업

- pnpm 설치

```bash
npm install -g pnpm
pnpm i
pnpm dev
```

- 환경 변수 설정

```dotenv
DATABASE_URL=PostgreSQL URL

AUTH_SECRET=NEXT_AUTH SECRET

EMAIL_FROM=이메일 로그인 시 보내는 이메일
EMAIL_SERVER=이메일 SMTP 서버

S3_UPLOAD_KEY=AWS S3 ACCESS KEY
S3_UPLOAD_SECRET=AWS S3 SECRET KEY
S3_UPLOAD_BUCKET=AWS S3 BUCKET
S3_UPLOAD_REGION=AWS S3 REGION

CLOUDFRONT_URL=AWS CLOUDFRONT URL
```

- 데이터베이스 마이그레이션

```bash
pnpm drizzle:generate
pnpm drizzle:push
```
