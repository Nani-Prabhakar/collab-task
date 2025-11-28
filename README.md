
## 📖 Usage

1. **Register** as Manager or User
2. **Login** to access dashboard
3. **Dashboard** shows:
   - Task statistics (total, completed, pending)
   - Tasks assigned to you
   - Tasks you created (Managers only)
4. **Create Tasks** (Managers):
   - Fill form with title, description, due date, user ID
   - Assign to any registered user by their `_id`
5. **Manage Tasks**:
   - Edit/Delete (Managers only)
   - Mark Complete/Pending (Assignees + Managers)

## 🖥 Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Task Management
![Tasks](screenshots/tasks.png)

### Login Page
![Login](screenshots/login.png)

*(Add actual screenshots to `/screenshots/` folder)*

## 📋 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/tasks` | Get all tasks | Yes |
| POST | `/api/tasks` | Create task | Yes |
| PUT | `/api/tasks/:id` | Update task | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Yes |

## 🔍 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB timeout | Start MongoDB service or use Atlas |
| `useAuthStore.getState` error | Check `src/utils/api.js` import |
| CORS errors | Backend CORS middleware configured |
| JWT invalid | Check `JWT_SECRET` in `.env` |

## 🧪 Testing

