package com.cartable.api.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "resources")
public class Resource {
    @Id
    private String id;

    private String title;

    @Column(length = 2000)
    private String description;

    private String author;
    private String authorId;
    private String level;
    private String subject;

    @ElementCollection
    private List<String> tags;

    private int likes;
    private int downloads;
    private String date;

    @Column(length = 5000)
    private String contentDetails;

    private String fileUrl;
    private String fileName;
    private int price;

    // Constructors
    public Resource() {
    }

    public Resource(String id, String title, String description, String author, String authorId, String level,
            String subject, List<String> tags, int likes, int downloads, String date, String contentDetails,
            String fileUrl, String fileName, int price) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.author = author;
        this.authorId = authorId;
        this.level = level;
        this.subject = subject;
        this.tags = tags;
        this.likes = likes;
        this.downloads = downloads;
        this.date = date;
        this.contentDetails = contentDetails;
        this.fileUrl = fileUrl;
        this.fileName = fileName;
        this.price = price;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public int getDownloads() {
        return downloads;
    }

    public void setDownloads(int downloads) {
        this.downloads = downloads;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getContentDetails() {
        return contentDetails;
    }

    public void setContentDetails(String contentDetails) {
        this.contentDetails = contentDetails;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
