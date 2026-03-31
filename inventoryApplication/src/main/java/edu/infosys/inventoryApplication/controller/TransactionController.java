package edu.infosys.inventoryApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.infosys.inventoryApplication.bean.ProductSale;
import edu.infosys.inventoryApplication.bean.Transaction;
import edu.infosys.inventoryApplication.dao.TransactionDao;
import edu.infosys.inventoryApplication.service.TransactionService;

@RestController
@RequestMapping("/invent/")
@CrossOrigin(origins = "http://localhost:3131", allowCredentials = "true")
public class TransactionController {

    @Autowired
    private TransactionDao transactionDao;

    @Autowired
    private TransactionService service;

    // ✅ FIXED: Use /trans and service layer
    @PostMapping("/trans")
    public void saveTransaction(@RequestBody Transaction transaction) {
        service.processTransaction(transaction);
    }

    // ✅ Keep this same
    @GetMapping("/stock/{id}")
    public Transaction findTransactionById(@PathVariable String id) {
        return transactionDao.findTransactionById(id);
    }

    @DeleteMapping("/stock/{id}")
    public void removeTransactionById(@PathVariable String id) {
        transactionDao.removeTransactionById(id);
    }

    // ✅ ID generation
    @GetMapping("/trans-id/{flag}")
    public String generateId(@PathVariable int flag) {
        return service.generateId(flag);
    }

    // ✅ IN / OUT transactions
    @GetMapping("/trans/{type}")
    public List<Transaction> findTransactionsByType(@PathVariable String type) {
        return transactionDao.findTransactionsByType(type);
    }

    // ✅ Demand analysis
    @GetMapping("/analysis/{id}")
    public List<Double> getDemandByProduct(@PathVariable String id) {
        return transactionDao.getDemandByProduct(id);
    }

    // ✅ Pie chart data
    @GetMapping("/analysis")
    public List<ProductSale> getProductWiseTotalSale() {
        return service.getProductWiseTotalSale();
    }
}