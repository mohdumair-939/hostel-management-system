package com.hostel.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hostel.backend.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
}