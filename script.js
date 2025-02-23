document.addEventListener("DOMContentLoaded", function () {
    
    //for getting form elements

    const studentForm = document.getElementById("studentForm");
    const studentList = document.getElementById("studentList");
    
    // creating empty array in local storage and saving data in storage
    
    let students = JSON.parse(localStorage.getItem("students")) || [];
    
    function saveToLocalStorage() {
        localStorage.setItem("students", JSON.stringify(students));
    }

    // display section data

    function showStudents() {
        studentList.innerHTML = "";

        students.forEach((student, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            studentList.appendChild(row);
        });
    }

    // for checking input 

    function validateInput(name, id, email, contact) {
        const nameRegex = /^[A-Za-z ]+$/;
        const idRegex = /^[0-9]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactRegex = /^[0-9]+$/;

        if (!name || !id || !email || !contact) {
            alert("All fields are required.");
            return false;
        }
        if (!nameRegex.test(name)) {
            alert("Student name should only contain letters.");
            return false;
        }
        if (!idRegex.test(id)) {
            alert("Student ID should be a number.");
            return false;
        }
        if (!emailRegex.test(email)) {
            alert("Enter a valid email address.");
            return false;
        }
        if (!contactRegex.test(contact)) {
            alert("Contact number should be a number.");
            return false;
        }
        return true;
    }

    // for editing student detail
    
    let editIndex = -1;

    window.editStudent = function (index) {
        const student = students[index];
        
        document.getElementById("studentName").value = student.name;
        document.getElementById("studentId").value = student.id;
        document.getElementById("studentEmail").value = student.email;
        document.getElementById("studentContactNo").value = student.contact;

        editIndex = index;
    };

    // for deleting student details

    window.deleteStudent = function (index) {
        if (confirm("Are you sure you want to delete this student?")) {
            students.splice(index, 1);
            saveToLocalStorage();
            showStudents();
        }
    };

    // form submission

    studentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("studentName").value.trim();
        const id = document.getElementById("studentId").value.trim();
        const email = document.getElementById("studentEmail").value.trim();
        const contact = document.getElementById("studentContactNo").value.trim();

        if (!validateInput(name, id, email, contact)) return;

        const student = { name, id, email, contact };

        if (editIndex === -1) {
            students.push(student);
        } else {
            students[editIndex] = student;
            editIndex = -1;
        }
        
        saveToLocalStorage();
        showStudents();
        studentForm.reset();
    });

    showStudents();
});
