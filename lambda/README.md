# AWS Lambda@edge

AWS Lambda@edge 함수 사용을 위한 소스코드입니다.
cloudfront에 연결된 Lambda@edge 함수로 사용됩니다.

## 주요 기능

이미지 조회 시 사이즈 리사이징 기능을 제공합니다.

### 쿼리 파라미터

- `w`: 너비
- `h`: 높이
- `f`: 이미지의 포맷 (jpeg, webp)
- `t`: 이미지의 타입 (contain, cover, fill, inside, outside)
- `q`: 이미지의 품질

## 배포

windows 환경의 경우, WSL 환경에서 의존성 패키지를 설치하고 zip으로 압축하여 업로드합니다.  

### node_modules 설치

```bash
npm build
```

### 업로드

index.mjs, node_modules, package.json 파일을 zip으로 압축하여 Lambda@edge 함수로 업로드합니다.
