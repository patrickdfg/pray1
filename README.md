# 기도의 숲 (pray1)

실제 Google 로그인과 Cloud Firestore를 사용하는 교회·기도팀·개인 기도 웹앱입니다.

- 서비스: https://patrickdfg.github.io/pray1/
- Firebase 프로젝트: `mock-invest-508310` (표시 이름 `pray1-prayer-space`)
- Firestore: Standard, `asia-northeast3` (Seoul), Spark 무료 요금제
- 배포: GitHub Pages (`main` 브랜치의 루트)
- 로그인: Firebase Authentication / Google
- 관리자: `egibynote105g@gmail.com` (이메일 확인된 계정만 교회 기도제목 쓰기 가능)

## 기능

- 교회 기도: 로그인한 누구나 보기, 지정된 관리자만 등록/수정/삭제
- 팀 기도: 비밀번호로 가입한 여러 기도방의 제목을 팀원끼리 함께 관리
- 개인 기도: 소유자만 읽고 수정할 수 있는 기도제목
- 나의 기도: 위 세 카테고리를 모아서 보고 하나씩 집중 기도
- 기도방: 이름, 시작·종료일, 8자 이상 참가 암호, 팀원 관리
- 기도방 종료: 팀장이 모든 팀원의 가입을 해지한 뒤 보관(archived) 처리

## 데이터 구조

- `churchPrayers/{id}`
- `users/{uid}/prayers/{id}`
- `rooms/{roomId}`
- `rooms/{roomId}/members/{uid}`
- `rooms/{roomId}/prayers/{id}`
- `roomCodes/{roomId}` — 클라이언트 직접 읽기 불가, 가입 시 보안 규칙으로 대조

모든 권한은 **Firebase Firestore 보안 규칙**에서 서버 측 검사하며, 앱 화면의 관리자 표시만으로는 권한이 부여되지 않습니다.

## 변경 및 배포

웹 페이지는 `index.html`을 수정하여 GitHub Pages에 배포합니다.
Firestore 규칙은 `firestore.rules` 파일에 보관하며, Firebase Console에 게시한 규칙과 일치해야 합니다.

향후 Firebase CLI를 사용할 때:

```sh
firebase login
firebase deploy --only firestore:rules
```

Firebase Hosting은 사용하지 않으며 GitHub Pages가 웹앱을 제공합니다.

> Firestore 기본 Spark 무료 사용량에는 한도가 있습니다. 팀 사용자가 많거나 데이터가 늘어나면 Firebase 콘솔 사용량을 확인하세요.
