package com.angdroidular.angdroidularauction;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.Toast;

import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    public static final String PRODUCT = "PRODUCT";
    private static final String ID = "ID" ;
    private ArrayList<Auction> auctions = new ArrayList<>();
    private ArrayList<Bid> bids = new ArrayList<>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        RequestQueue requestQueue = Volley.newRequestQueue(this);

        JsonArrayRequest request = new JsonArrayRequest("http://nackademiska-api.azurewebsites.net/api/auction",
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        try {
                            for (int i = 0; i < response.length(); i++) {

                                JSONObject auction = (JSONObject) response.get(i);
                                auctions.add(new Auction(auction.getString("id"),
                                        auction.getString("name"),
                                        auction.getDouble("buyNowPrice"),
                                        auction.getString("imageUrl"),
                                        auction.getString("supplierId"),
                                        auction.getString("categoryId"),
                                        auction.getString("endTime"),
                                        auction.getString("startTime")));

                                //getBid(response,auction.getString("id"));
                            }
                            for (int i = 0; i < bids.size(); i++) {

                            }

                            setupProductList();

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

            }
        });





        requestQueue.add(request);


    }

    /*public void getBid(JSONArray response, final String ID){
        JsonArrayRequest request2 = new JsonArrayRequest("http://nackademiska-api.azurewebsites.net/api/bid/" + ID,
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        try {
                            for (int i = 0; i < response.length(); i++) {
                                JSONObject bid = (JSONObject) response.get(i);
                                bids.add(new Bid(bid.getString("id"),
                                        bid.getString("auctionId"),
                                        bid.getString("customerId"),
                                        bid.getString("dateTime"),
                                        bid.getDouble("bidPrice")));
                            }
                            *//*Collections.sort(bids, new Comparator<Bid>() {
                                @Override
                                public int compare(Bid bid1, Bid bid2) {
                                    return Double.compare(bid1.getBidPrice(), bid2.getBidPrice());
                                }
                            });*//*
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {

            }
        });
        ArrayList<JsonArrayRequest> requestQueue = null;
        requestQueue.add(request2);
    }*/
    private void setupProductList() {
        ProductListAdapter productAdapter = new ProductListAdapter(this, R.layout.product_list_item, auctions);

        ListView productListView = (ListView) findViewById(R.id.productListView);

        productListView.setAdapter(productAdapter);


        productListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(MainActivity.this, DetailActivity.class);
                intent.putExtra(PRODUCT, auctions.get(position));
                startActivity(intent);
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        switch (id) {
            case R.id.action_settings:
                Toast toast = Toast.makeText(MainActivity.this, "Du klickade settings", Toast.LENGTH_SHORT);
                toast.show();
                return true;
            case R.id.action_about:
                Intent intent = new Intent(MainActivity.this, AboutActivity.class);
                startActivity(intent);
                return true;
        }


        return super.onOptionsItemSelected(item);
    }
}
