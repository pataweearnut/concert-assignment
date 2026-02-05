# 🎟️ Concert Reservation System

A full-stack concert reservation system built with **Next.js** and **NestJS**, focusing on correctness, scalability, and clean architecture.

---

## 🧱 Tech Stack

**Frontend**
- Next.js (TypeScript)
- Tailwind CSS

**Backend**
- NestJS
- TypeORM
- SQLite

---

## ✨ Features

### User
- View concerts
- Reserve / cancel seats

### Admin
- Create / delete concerts
- View all reservations
- View system statistics

### System
- Role-based access (`ADMIN`, `USER`)
- Append-only reservation history
- Concurrency-safe seat handling

---

## 🧠 Key Design Decisions

- **Event-based history**  
  Reservations are never deleted.  
  `RESERVE` and `CANCEL` are stored as immutable events.

- **State derived from latest event**  
  Current reservation state is determined by the most recent event per user & concert.

- **Transactions for consistency**  
  Seat updates and cancellations are wrapped in database transactions.

---

## 🎁 Bonus Tasks (Optional)

### 1️⃣ How to optimize the website for intensive data and high traffic?

To handle large amounts of data and many concurrent users, I would apply:

- **API-level pagination & filtering** to avoid loading unnecessary data
- **Database indexing** on frequently queried fields (e.g. `userId`, `createdAt`)
- **Caching** (Redis) for frequently accessed data such as concert lists
- **CDN & static optimization** for frontend assets
- **Lazy loading & code splitting** on the frontend
- **Horizontal scaling** of backend services when traffic increases
- **queue-based reservation** (e.g. message queue) for extreme traffic spikes

These techniques ensure the system remains responsive even under heavy load.

---

### 2️⃣ How to handle many users reserving tickets at the same time?

To prevent overbooking and ensure no one needs to stand during the concert:

- **Atomic seat decrement** using database-level conditions (`availableSeats > 0`)
- **Transactions** to ensure seat updates and reservation records are consistent
- **Optimistic locking / row-level locking** to handle race conditions
- **Clear failure responses** when seats are no longer available
- Optionally, **queue-based reservation** (e.g. message queue) for extreme traffic spikes

This guarantees seat integrity even when many users attempt to reserve simultaneously.

---

## 🔐 Authentication (Demo)

Authentication is simulated using request headers:
```
x-user-id
x-role (ADMIN | USER)
```

Role is derived from the route:
- `/admin/*` → ADMIN
- `/user/*` → USER

---

## 🌍 Environment Variables

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 🚀 Getting Started

### Backend
```bash
cd concert-api
npm install
npm run start:dev
```

### Frontend
```bash
cd concert-web
npm install
npm run dev
```

---

## 🧪 Testing

- Unit tests for core services
- Edge cases and concurrency covered
- Coverage > 80%

```bash
npm run test
npm run test:cov
```

---

## 🎤 Notes

This project demonstrates:
- Event-based backend design
- Safe concurrent updates
- Clean frontend patterns

---

For demonstration and evaluation purposes only.
