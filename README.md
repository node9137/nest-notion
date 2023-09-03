# 원티드 프리온보딩 백엔드 인턴쉽 팀과제 구현

## 목차

0. 과제 설명 및 mysql docker 셋팅
1. 팀소개
2. 테이블 구조
3. 비지니스 로직
4. 결과 정보
5. 실행 영상
<hr/>

## 0. 과제 설명 및 mysql docker 셋팅
</br>

과제 규격 링크 : https://lordmyshepherd.notion.site/Breadcrumbs-e970b412231049cca1593370ad8e8605</br>
제출 링크(노션) : https://waiting-partridge-533.notion.site/nest-notion-Breadcrumbs-a5eab000c9a54450b46332bbf99a1ab1?pvs=4</br>
</br>

- 주의 사항! 프젝트 clone 전에 도커 설치 및 환경설정이 되어있어야합니다!(꼭!) 
- git clone
    ```
    git clone [https://github.com/node9137/wanted-pre-onboarding-backend.git](https://github.com/node9137/nest-notion/edit/develop/README.md)
    ```
-  docker-compose.yml 파일은 평가상 편의성을 위해 ignore 에서 제외하였습니다. <br/>
   해당 파일에서 확인 가능합니다.
    ```
    docker-compose.yml 
    ```
- docker compose 실행
    ```
    sudo docker-compose up -d
    ```
- 테이블 정보는 사전에 같이 패키징 되어있습니다. 바로 구동 가능합니다.

- 주의 사항! 
    - docker 를 사용한 mysql 셋팅의 경우 사용자의 환경에 따라 host 정보를 번경해주어야합니다.</br>
    - 도커 리눅스 호스트 : '172.17.0.1' </br>
    - 도커를 사용하지않는 호스트 : '127.0.0.1'</br>
    - mac/window : 'host.docker.internal'</br>

## 1. 팀소개  

### 매일 조금씩 이지만 level-up! 하는걸 목표로 서로 성장해가는 팀! Nest-Level 입니다 ** 
### **NEST-병규 : 내일의 나는 오늘보다 조금 더 발전하길 원하는 개발자**
### NEST-연주 : 느리지만 견고하게 쌓아가는 개발자
### NEST-영수 : 깃허브 탐방을 좋아하는 개발자

## 2. 테이블 구조
</br>

![nest-netion](https://github.com/node9137/nest-notion/assets/139099596/20a42e37-516d-49e9-b9cd-3bee1db27744)

## 3. 비지니스 로직

- 위의 테이블 구조 처럼 , subpages 와 breadcrumbs 는 문자열로 구성이 되어 있습니다.</br>

> 이에 따라 , Controller 와 유사한 getPage 에서 , param 의 postId 를 통해서 , DB에 query 문을 보내서 , data 를 받아옵니다. </br>
해당 data에는 공백이거나 정보를 담고 있는 breadcrumbs 와 subpages가 넘어옵니다. </br>
이 값들을 쉼표(,) 를 구분자로 구분하여 문자열을 배열로 변환 후 , 다시 data 를 넘겨줍니다. </br>
> 

```jsx
// getPage ( Controller Mocking )
const pool = require('../database/pool');
const selectPage = require('../functions/selectPage');
const parsingStringToArray = require('../utils/parsingStringToArray');

module.exports = async function getPage(param){
    const postId = param.postId
    const page = await selectPage(pool,postId);
    const data = page.data
    data.breadcrumbs = data.breadcrumbs.length !=='' ? parsingStringToArray(data.breadcrumbs):null
    data.subpages = data.subpages.length !=='' ? parsingStringToArray(data.subpages):null
    return data
}
```

```jsx
// selectPage ( Service-Repository 와 유사하게 Logic 수행 )
const result = await pool.query('SELECT * FROM page WHERE page_id=?',param)
	return {"code":0,"data":result[0][0]}
```

```jsx
// parsingStrngToArray ( String -> Array )
module.exports = function(string) {
    return string.split(",")
}
```

### 코드 리뷰

- 파일 및 폴더 구분을 잘하고 , 네이밍 통일성이 좋다.
- 삼항 연산자를 써서 코드가 좀 더 간결해졌다.
- return 형식을 통일 시키는게 , 코드 가독성 과 통일성이 좋은 것 같다.

## 4. 결과 정보
</br>

- [팀 과제] 노션에서 브로드 크럼스(Breadcrumbs) 만들기 - [[링크]](https://www.notion.so/Breadcrumbs-e970b412231049cca1593370ad8e8605?pvs=21)
- 페이지 조회 API 주제에 집중하여 필요 없는 테이블을 생성하지 않고 Page 테이블 하나로 구성했습니다.
- DB 연결시 ConnectionPool을 이용하여 node.js의 장점인 비동기를 효율적으로 사용하도록 구성했습니다.
- MySQL 기준으로 JSON 데이터 타입보다 VARCHAR 데이터 타입을 Split 하여 사용하는 것이 성능에 더 좋다고 테스트 해보고 subPages, breadcrumbs 컬럼을 구성했습니다.
    - 반환할 때만 배열로 변환하여 돌려주고 *내부적으로 처리할 때는 문자열로 관리*하여 추가 작업을 줄이기로 결정했습니다.  🥳
- 에러 처리를 할 경우를 대비하여 함수 결과값을 *성공*  `{ code:0 }` 과 *실패* `{ code:1 }` 로 나누어서 처리했습니다.

## 4. 실행 영상(링크)

https://youtu.be/j1EtEB3Tmfs
</br>
<hr/>
