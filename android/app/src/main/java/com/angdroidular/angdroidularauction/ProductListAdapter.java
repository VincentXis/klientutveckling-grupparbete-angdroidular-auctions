package com.angdroidular.angdroidularauction;

/**
 * Created by Rand on 2017-03-17.
 */

import android.content.Context;
import android.support.annotation.LayoutRes;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Locale;

public class ProductListAdapter extends ArrayAdapter<Auction> {
    private ArrayList<Auction> products;

    public ProductListAdapter(@NonNull Context context, @LayoutRes int resource, @NonNull ArrayList<Auction> objects) {
        super(context, resource, objects);

        products = objects;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {

        if(convertView == null) {
            convertView = LayoutInflater.from(getContext()).inflate(R.layout.product_list_item, parent, false);
        }

        Auction product = products.get(position);
        TextView productName = (TextView) convertView.findViewById(R.id.productNameTextView);
        TextView productPrice = (TextView) convertView.findViewById(R.id.productPriceTextView);
        ImageView productImage = (ImageView) convertView.findViewById(R.id.productImageView);

        productName.setText(product.getName());

        Locale swedish = new Locale("sv", "SE");
        NumberFormat priceFormat = NumberFormat.getCurrencyInstance(swedish);
        String price = priceFormat.format(product.getPrice());
        productPrice.setText(price);

        Picasso.with(getContext()).load(product.getImageUrl()).into(productImage);

        return convertView;
    }
}
