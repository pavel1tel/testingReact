# testingReact

## Endpoint's

localhost:8761 - eureka service discovery


localhost:3000 -react


localhost:4321 -gateway


localhost:4321/auth/oauth/token - get auth token


HTTP request to get token
<br/>
<code>
POST /auth/oauth/token HTTP/1.1
<br/>
Host: localhost:4321
<br/>
Authorization: Basic YWNjb3VudC1zZXJ2aWNlOnNlY3JldA==
<br/>
Content-Type: application/x-www-form-urlencoded
<br/>
Cookie: JSESSIONID=7F042472D18AA161677A8C5881943DDF
<br/>
grant_type=client_credentials&username=pawloiwanov@gmail.com&password=grib1111
</code>

localhost:4321/accounts/ - test resorce server, needs auth token

set header: Authorization : bearer {token}