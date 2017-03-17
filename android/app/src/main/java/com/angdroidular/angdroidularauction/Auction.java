package com.angdroidular.angdroidularauction;

import java.io.Serializable;

/**
 * Created by Rand on 2017-03-17.
 */

public class Auction implements Serializable {
    private String name;
    private double price;
    private String imageUrl;
    private String supplierId;

    public Auction(String name, double price, String imageUrl, String supplierId) {
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.supplierId = supplierId;
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
}