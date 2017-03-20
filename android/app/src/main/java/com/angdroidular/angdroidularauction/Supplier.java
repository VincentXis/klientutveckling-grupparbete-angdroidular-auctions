package com.angdroidular.angdroidularauction;

/**
 * Created by Rand on 2017-03-17.
 */

import java.io.Serializable;

public class Supplier implements Serializable {

    private String companyName;
    private String phone;
    private String address;

    public Supplier(String companyName, String phone, String address) {
        this.companyName = companyName;
        this.phone = phone;
        this.address = address;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
