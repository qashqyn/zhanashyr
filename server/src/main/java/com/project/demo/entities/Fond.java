package com.project.demo.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "fonds")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Fond {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "location")
    private String location;

    @Column(name = "category")
    private String category;

    @Lob
    @Column(name = "img")
    private String img;
}