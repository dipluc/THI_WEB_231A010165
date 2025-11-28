 // --- 1. CẤU HÌNH NGƯỜI DÙNG (QUAN TRỌNG) ---
         // Hãy thay đổi MSSV của bạn ở đây để test màu sắc
         const CURRENT_MSSV = "010165"; // Ví dụ: 20241235 (Lẻ -> Xanh Dương), 20241234 (Chẵn -> Đỏ)
         
         // Key lưu trữ LocalStorage theo yêu cầu: tasks_[MSSV]
         const STORAGE_KEY = `tasks_${CURRENT_MSSV}`;
 
         // Hiển thị MSSV ra giao diện
         document.getElementById('displayMSSV').innerText = CURRENT_MSSV;
 
         // Mảng chứa danh sách công việc
         let tasks = [];
 
         // --- 2. HÀM KHỞI TẠO (CHẠY KHI MỞ WEB) ---
         function init() {
             // Lấy dữ liệu từ LocalStorage
             const storedTasks = localStorage.getItem(STORAGE_KEY);
             if (storedTasks) {
                 tasks = JSON.parse(storedTasks);
             }
             renderTasks();
         }
 
         // --- 3. HÀM XỬ LÝ LOGIC "CHỐNG AI" (MÀU SẮC) ---
         function getTaskColorClass(taskName) {
             // Điều kiện 1: Độ dài > 10 ký tự
             if (taskName.length > 10) {
                 // Lấy số cuối cùng của MSSV
                 const lastDigit = parseInt(CURRENT_MSSV.slice(-1));
                 
                 // Logic Chẵn/Lẻ
                 if (lastDigit % 2 === 0) {
                     return "text-red"; // Số chẵn -> Màu Đỏ
                 } else {
                     return "text-blue"; // Số lẻ -> Màu Xanh Dương
                 }
             }
             return ""; // Không đổi màu nếu <= 10 ký tự
         }
 
         // --- 4. HÀM THÊM CÔNG VIỆC ---
         function addTask() {
             const nameInput = document.getElementById('taskInput');
             const priorityInput = document.getElementById('priorityInput');
             
             const taskName = nameInput.value.trim();
             const priority = parseInt(priorityInput.value);
 
             if (taskName === "") {
                 alert("Vui lòng nhập tên công việc!");
                 return;
             }
 
             // Tạo object Task mới
             const newTask = {
                 id: Date.now(), // ID duy nhất dựa trên thời gian
                 name: taskName,
                 priority: priority
             };
 
             // Thêm vào mảng và lưu lại
             tasks.push(newTask);
             saveData();
             
             // Reset ô nhập và vẽ lại giao diện
             nameInput.value = "";
             renderTasks();
         }
 
         // --- 5. HÀM XÓA CÔNG VIỆC ---
         function deleteTask(id) {
             if(confirm("Bạn có chắc muốn xóa task này?")) {
                 tasks = tasks.filter(t => t.id !== id);
                 saveData();
                 renderTasks();
             }
         }
 
         // --- 6. HÀM LƯU DỮ LIỆU ---
         function saveData() {
             localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
         }
 
         // --- 7. HÀM HIỂN THỊ (RENDER) ---
         function renderTasks() {
             // Xóa nội dung cũ trong 4 ô
             document.getElementById('list-1').innerHTML = "";
             document.getElementById('list-2').innerHTML = "";
             document.getElementById('list-3').innerHTML = "";
             document.getElementById('list-4').innerHTML = "";
 
             // Duyệt qua từng task để hiển thị
             tasks.forEach(task => {
                 // Xác định màu sắc dựa trên Logic Chống AI
                 const colorClass = getTaskColorClass(task.name);
                 
                 // Tạo thẻ li
                 const li = document.createElement('li');
                 li.innerHTML = `
                     <span class="${colorClass}">${task.name}</span>
                     <button class="delete-btn" onclick="deleteTask(${task.id})">
                         <i class="fa-solid fa-xmark"></i>
                     </button>
                 `;
 
                 // Đưa vào đúng ô dựa trên priority (1, 2, 3, 4)
                 const targetListId = `list-${task.priority}`;
                 document.getElementById(targetListId).appendChild(li);
             });
         }
 
         // Chạy khởi tạo
         init();