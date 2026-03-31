package edu.infosys.inventoryApplication.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.inventoryApplication.bean.Product;
import edu.infosys.inventoryApplication.bean.ProductSale;
import edu.infosys.inventoryApplication.bean.Transaction;
import edu.infosys.inventoryApplication.dao.ProductDao;
import edu.infosys.inventoryApplication.dao.TransactionDao;

@Service
public class TransactionService {

    @Autowired
    private TransactionDao transactionDao;

    @Autowired
    private ProductDao productDao;

    // ✅ FINAL FIXED METHOD
    public void processTransaction(Transaction t) {

        // 🔹 1. Generate ID
        String type = t.getTransactionType();
        String maxId = transactionDao.findMaxTransactionIdByType(type);

        String newId;

        if (maxId == null) {
            if (type.equalsIgnoreCase("IN"))
                newId = "IN100001";
            else
                newId = "OUT100001";
        } else {
            int x;

            if (type.equalsIgnoreCase("IN")) {
                x = Integer.parseInt(maxId.substring(2));
                newId = "IN" + (x + 1);
            } else {
                x = Integer.parseInt(maxId.substring(3)); // ✅ FIXED
                newId = "OUT" + (x + 1);
            }
        }

        t.setTransactionId(newId);

        // 🔹 2. Calculate transaction value
        double value = t.getRate() * t.getQuantity();
        t.setTransactionValue(value);

        // 🔹 3. Save transaction
        transactionDao.saveTransaction(t);

        // 🔹 4. Update product stock
        Product product = productDao.getProductById(t.getProductId());

        if (product == null) {
            throw new RuntimeException("Product not found");
        }

        if (type.equalsIgnoreCase("OUT")) {

            // ✅ STOCK VALIDATION (VERY IMPORTANT)
            if (product.getStock() < t.getQuantity()) {
                throw new RuntimeException("Insufficient stock");
            }

            product.setStock(product.getStock() - t.getQuantity());

        } else {
            product.setStock(product.getStock() + t.getQuantity());
        }

        // 🔹 5. Update status
        if (product.getStock() > product.getReorderLevel()) {
            product.setStatus(true);
        } else {
            product.setStatus(false);
        }

        // 🔹 6. Save updated product
        productDao.saveProduct(product);
    }

    // ✅ ID GENERATOR (CLEANED)
    public String generateId(int flag) {

        String type = (flag == 1) ? "IN" : "OUT";

        String id = transactionDao.findMaxTransactionIdByType(type);

        if (id == null) {
            return type.equals("IN") ? "IN100001" : "OUT100001";
        }

        int x;

        if (type.equals("IN")) {
            x = Integer.parseInt(id.substring(2));
            return "IN" + (x + 1);
        } else {
            x = Integer.parseInt(id.substring(3)); // ✅ FIXED
            return "OUT" + (x + 1);
        }
    }

    // ✅ SALES ANALYSIS (NO CHANGE)
    public List<ProductSale> getProductWiseTotalSale() {

        List<ProductSale> salesList = transactionDao.getProductWiseTotalSale();
        HashMap<String, ProductSale> salesMap = new HashMap<>();

        for (ProductSale prod : salesList) {

            if (salesMap.containsKey(prod.getProductName())) {

                Double val = salesMap.get(prod.getProductName()).getTotalSaleValue();
                val += prod.getTotalSaleValue();

                prod.setTotalSaleValue(val);
                salesMap.put(prod.getProductName(), prod);

            } else {
                salesMap.put(prod.getProductName(), prod);
            }
        }

        return new ArrayList<>(salesMap.values());
    }
}