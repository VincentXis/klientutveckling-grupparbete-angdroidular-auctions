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
    String supp = "";
    //private ArrayList<Supplier> supplierDetails = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        RequestQueue requestQueue = Volley.newRequestQueue(this);


        //getSupportActionBar().setDisplayHomeAsUpEnabled(true);


        Intent intent = getIntent();
        final Auction auction = (Auction) intent.getSerializableExtra(MainActivity.PRODUCT);




        final JsonObjectRequest request = new JsonObjectRequest("http://nackademiska-api.azurewebsites.net/api/supplier/" + auction.getSupplierId(),
                null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {

                            JSONObject supplier = (JSONObject) response;
                            supplierDetails = new Supplier(supplier.getString("companyName"),
                                                            supplier.getString("phone"),
                                                            supplier.getString("address"));

                            TextView textView = (TextView) findViewById(R.id.textView);


                            String s = "Namn: " + auction.getName() + "\n" + "Start tid: " + auction.getStartTime() + "\n" +
                                    "Slut tid: " + auction.getEndTime() + "\n" + "Acceptans pris: " + auction.getPrice() + "\n" + "Levarantör: " + supplierDetails.getCompanyName();

                            textView.setText(s);

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

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                TextView textView = (TextView) findViewById(R.id.textView);

                Intent intent = new Intent();
                intent.setAction(Intent.ACTION_SEND);
                intent.putExtra(Intent.EXTRA_TEXT, textView.getText());
                intent.putExtra(Intent.EXTRA_SUBJECT,"Kolla in den här auktionen!");
                intent.setType("text/plain");
                startActivity(intent);

            }
        });

    }



}
