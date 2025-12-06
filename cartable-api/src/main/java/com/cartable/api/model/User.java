package com.cartable.api.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    private String id;

    private String name;
    private String email;
    private String avatarUrl;
    private int credits;

    @ElementCollection
    private List<String> uploads;

    @ElementCollection
    private List<String> purchased;

    @ElementCollection
    private List<String> following;

    public User() {
    }

    public User(String id, String name, String email, String avatarUrl, int credits, List<String> uploads,
            List<String> purchased, List<String> following) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.avatarUrl = avatarUrl;
        this.credits = credits;
        this.uploads = uploads;
        this.purchased = purchased;
        this.following = following;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public List<String> getUploads() {
        return uploads;
    }

    public void setUploads(List<String> uploads) {
        this.uploads = uploads;
    }

    public List<String> getPurchased() {
        return purchased;
    }

    public void setPurchased(List<String> purchased) {
        this.purchased = purchased;
    }

    public List<String> getFollowing() {
        return following;
    }

    public void setFollowing(List<String> following) {
        this.following = following;
    }
}
