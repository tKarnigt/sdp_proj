# SDP-Backend

## Tech Stack
- **Backend** [Nodejs TypeScript](https://nodejs.org/en)
- **ORM** [Prisma](https://www.prisma.io/)
- **Container** [Docker Desktop](https://www.docker.com/products/docker-desktop/)
    - **Database** [Postgesql](https://www.postgresql.org/)
    - **Database management** [pgAdmin4](https://www.pgadmin.org/download/)

## Setup Project

#### 1. Clone Project
```bash
git clone https://github.com/UnixVextor/SDP-Backend.git
cd SDP-Backend
```

#### 2. Install [docker desktop](https://www.docker.com/products/docker-desktop/) and run `docker`
```bash
docker-compose up
```
**or run docker in background** 

```bash
docker-compose up -d
```
##### Open `pgAdmin4` on port `5050` or  http://localhost:5050/
```bash
PGADMIN_DEFAULT_EMAIL: root@root.com
PGADMIN_DEFAULT_PASSWORD: root
```

#### Database Config
```bash
    POSTGRES_USER: root
    POSTGRES_PASSWORD: root
    PORT: 5432
    IP: 192.168.0.2
```



#### 3. Install `Nodejs` and `Prisma` Dependency
```bash
npm i
```

#### 4. Run Project on http://localhost:8000/
```bash
npm run dev
```

#### .env file
```bash
DATABASE_URL=postgresql://root:root@db:5432/sdpDb

PORT=8000
ACCESS_TOKEN_SECRET="9bfa611c626259efd6491440db1b97081e5c851a1fca53daff8182b191e0180c322d472113f5e0b71bebbeee83b2378cf346576184e2ee5dbe22d2faab8c08f7"
```
