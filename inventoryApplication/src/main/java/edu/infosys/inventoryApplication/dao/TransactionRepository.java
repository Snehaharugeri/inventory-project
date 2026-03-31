package edu.infosys.inventoryApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.inventoryApplication.bean.ProductSale;
import edu.infosys.inventoryApplication.bean.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, String> {

    // ✅ Get max transaction ID (IN / OUT)
    @Query("SELECT MAX(a.transactionId) FROM Transaction a WHERE a.transactionType = ?1")
    public String findMaxTransactionIdByType(String type);

    // ✅ Get transactions by type (IN / OUT)
    @Query("SELECT a FROM Transaction a WHERE a.transactionType = ?1")
    public List<Transaction> findTransactionsByType(String type);

    // ✅ FIXED: Product-wise total sale (IMPORTANT)
    @Query("SELECT new edu.infosys.inventoryApplication.bean.ProductSale(p.productName, SUM(s.transactionValue)) " +
           "FROM Product p JOIN Transaction s ON p.productId = s.productId " +
           "WHERE s.transactionType='OUT' GROUP BY p.productId, p.productName")
    public List<ProductSale> getProductWiseTotalSale();

    // ✅ Demand per product
    @Query("SELECT s.transactionValue FROM Transaction s WHERE s.transactionType='OUT' AND s.productId=?1")
    public List<Double> getDemandByProduct(String productId);

    // ✅ Get transactions by product ID
    @Query("SELECT t FROM Transaction t WHERE t.productId = ?1")
    public List<Transaction> findByProductId(String productId);
}