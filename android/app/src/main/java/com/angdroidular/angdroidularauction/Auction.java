package com.angdroidular.angdroidularauction;

import java.io.Serializable;

/**
 * Created by Rand on 2017-03-17.
 */

public class Auction implements Serializable {

    private String id;
    private String name;
    private double price;
    private String imageUrl;
    private String supplierId;
    private String categoryId;
    private String endTime;
    private String startTime;


    public Auction(String id, String name, double price, String imageUrl, String supplierId, String categotyId, String endTime, String startTime) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.supplierId = supplierId;
        this.categoryId = categotyId;
        this.endTime = endTime;
        this.startTime = startTime;

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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(String supplierId) {
        this.supplierId = supplierId;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

}