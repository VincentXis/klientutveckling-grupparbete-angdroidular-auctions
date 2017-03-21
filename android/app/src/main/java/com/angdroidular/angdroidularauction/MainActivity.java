package com.angdroidular.angdroidularauction;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
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

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    public static final String PRODUCT = "PRODUCT";
    private static final String ID = "ID" ;
    private ArrayList<Auction> auctions = new ArrayList<>();
    private ArrayList<Bid> bids = new ArrayList<>();
    private RequestQueue requestQueue;
    private ListView productListView;
    private ProductListAdapter productAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        requestQueue = Volley.newRequestQueue(this);
        productListView = (ListView) findViewById(R.id.productListView);
        productAdapter = new ProductListAdapter(this, R.layout.product_list_item, auctions);

        JsonArrayRequest request = new JsonArrayRequest("http://nackademiska-api.azurewebsites.net/api/auction",
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        try {
                            for (int i = 0; i < response.length(); i++) {

                                JSONObject auction = (JSONObject) response.get(i);

                                if (checkDates(auction.getString("startTime"),auction.getString("endTime")))
                                {
                                    auctions.add(new Auction(auction.getString("id"),
                                            auction.getString("name"),
                                            auction.getDouble("buyNowPrice"),
                                            auction.getString("imageUrl"),
                                            auction.getString("supplierId"),
                                            auction.getString("categoryId"),
                                            auction.getString("endTime"),
                                            auction.getString("startTime")));
                                }
                            }

                            for(Auction auction: auctions) {
                                fetchBids(auction);
                            }

                            setupProductList();

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


    }

    private boolean checkDates(String startTime, String endTime) {
        try {


            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'hh:mm:ss");
            Date startDate = sdf.parse(startTime);
            Date endDate = sdf.parse(endTime);
            Date today = new Date();



            if (startDate.after(today)) return false;
            if (endDate.before(today)) return false;

        } catch (ParseException e) {
            Log.d("MyError", e.getMessage());
            e.printStackTrace();
        }
        return true;
    }

    private void fetchBids(final Auction auction) {
        JsonArrayRequest request = new JsonArrayRequest("http://nackademiska-api.azurewebsites.net/api/bid/" + auction.getId(),
                new Response.Listener<JSONArray>() {
                    @Override
                    public void onResponse(JSONArray response) {
                        try {
                            for (int i = 0; i < response.length(); i++) {
                                JSONObject bid = (JSONObject) response.get(i);



                                auction.addBid(new Bid(bid.getString("id"),
                                        bid.getString("auctionId"),
                                        bid.getString("customerId"),
                                        bid.getString("dateTime"),
                                        bid.getDouble("bidPrice")
                                ));
                                if (auction.getPrice() == auction.getHighestBid()) {
                                    auctions.remove(auction);
                                }

                                productAdapter.notifyDataSetChanged();
                            }

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
            case R.id.action_about:
                Intent intent = new Intent(MainActivity.this, AboutActivity.class);
                startActivity(intent);
                return true;
        }


        return super.onOptionsItemSelected(item);
    }
}
