package com.angdroidular.angdroidularauction;

/**
 * Created by Rand on 2017-03-17.
 */


import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.TextView;

import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class DetailActivity extends AppCompatActivity {

    private Supplier supplierDetails;
    //private ArrayList<Supplier> supplierDetails = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        RequestQueue requestQueue = Volley.newRequestQueue(this);

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);


        Intent intent = getIntent();
        Auction auction = (Auction) intent.getSerializableExtra(MainActivity.PRODUCT);



        final JsonObjectRequest request = new JsonObjectRequest("http://nackademiska-api.azurewebsites.net/api/supplier/0b9dbb4d-4815-4f1a-a24f-e2bd167ef8cd" ,
                null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {

                            JSONObject supplier = (JSONObject) response;
                            supplierDetails = new Supplier(supplier.getString("companyName"),
                                    supplier.getString("phone"),
                                    supplier.getString("address"));



                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                error.printStackTrace();
            }
        });
        requestQueue.add(request);

        TextView textView = (TextView) findViewById(R.id.textView);



        textView.setText(auction.getName()+"\n" + supplierDetails.getCompanyName()+"\n"+ supplierDetails.getPhone()+"\n"+supplierDetails.getAddress());
    }


    public void clickMe(View view) {
        TextView textView = (TextView) findViewById(R.id.textView);
        textView.setText(supplierDetails.toString());
    }
}
