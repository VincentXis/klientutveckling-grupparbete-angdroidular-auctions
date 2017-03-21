package com.angdroidular.angdroidularauction;

import java.io.Serializable;

/**
 * Created by Rand on 2017-03-17.
 */

public class Bid implements Serializable {
    private String id;
    private String auctionId;
    private String customerId;
    private String dateTime;
    private double bidPrice;

    public Bid(String id, String auctionId, String customerId, String dateTime, double bidPrice) {
        this.id = id;
        this.auctionId = auctionId;
        this.customerId = customerId;
        this.dateTime = dateTime;
        this.bidPrice = bidPrice;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAuctionId() {
        return auctionId;
    }

    public void setAuctionId(String auctionId) {
        this.auctionId = auctionId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getDateTime() {
        return dateTime;
    }

    public void setDateTime(String dateTime) {
        this.dateTime = dateTime;
    }

    public double getBidPrice() {
        return bidPrice;
    }

    public void setBidPrice(double bidPrice) {
        this.bidPrice = bidPrice;
    }
}
