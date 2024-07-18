// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StudentAttendance {
    address public teacher;
    mapping(address => bool) public students;
    mapping(uint => mapping(address => bool)) public dateToStudentAttendance;

    constructor(address[] memory studentAddresses, address teacherAddress) {
        teacher = teacherAddress;
        for(uint i = 0; i < studentAddresses.length; i++) {
            students[studentAddresses[i]] = true;
        }
    }

    modifier onlyStudent() {
        require(students[msg.sender], "Only students can perform this action");
        _;
    }

    modifier onlyTeacher() {
        require(msg.sender == teacher, "Only the teacher can perform this action");
        _;
    }

    function markAttendance() external onlyStudent {
        uint today = getToday();
        require(!dateToStudentAttendance[today][msg.sender], "Attendance already marked for today");
        dateToStudentAttendance[today][msg.sender] = true;
    }

    function checkAttendance(uint date, address student) external view onlyTeacher returns (bool) {
        return dateToStudentAttendance[date][student];
    }

    function addStudent(address student) external onlyTeacher {
        students[student] = true;
    }

    function removeStudent(address student) external onlyTeacher {
        students[student] = false;
    }

    function getToday() public view returns (uint) {
        return block.timestamp / 86400; // Days since Unix epoch
    }
}