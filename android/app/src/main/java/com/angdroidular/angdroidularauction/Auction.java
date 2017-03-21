package com.angdroidular.angdroidularauction;


import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    private List<Bid> bids;


    public Auction(String id, String name, double price, String imageUrl, String supplierId, String categotyId, String endTime, String startTime) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.supplierId = supplierId;
        this.categoryId = categotyId;
        this.endTime = endTime;
        this.startTime = startTime;
        bids = new ArrayList<>();
    }

    public boolean isAuctionValid() {

        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
            Date startDate = sdf.parse(startTime);
            Date endDate = sdf.parse(endTime);
            Date today = new Date();

            if (startDate.after(today)) return false;
            if (endDate.before(today)) return false;

        } catch (ParseException e) {
            e.printStackTrace();
        }

        if (price == getHighestBid()) return false;


        return true;
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

    public void setBids(List<Bid> bids) {
        this.bids = bids;
    }

    public void addBid(Bid bid) {
        this.bids.add(bid);
    }

    public double getHighestBid() {
        return bids.size() > 0 ? bids.get(bids.size()-1).getBidPrice() : 0;
    }
}