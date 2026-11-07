
package com.expensetracker.expense_tracker.controller;

import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.Map;
import jakarta.validation.Valid;
import com.expensetracker.expense_tracker.model.Expense;
import com.expensetracker.expense_tracker.service.ExpenseService;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;


@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }
    @GetMapping("/total")
    public double getTotalExpenses() {
        return expenseService.getTotalExpenses();
    }
    @GetMapping("/monthly")
    public double getMonthlyExpenses(
            @RequestParam int year,
            @RequestParam int month) {

        return expenseService.getMonthlyExpenses(year, month);
    }
    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id) {
        return expenseService.getExpenseById(id);
    }

    @PostMapping
    public Expense addExpense(@Valid @RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }
    @PutMapping("/{id}")
    public Expense updateExpense(
            @PathVariable Long id,
            @Valid @RequestBody Expense expense) {

        return expenseService.updateExpense(id, expense);
    }
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
    }
    @GetMapping("/category-summary")
    public Map<String, Double> getCategoryWiseExpenses() {
        return expenseService.getCategoryWiseExpenses();
    }
    @GetMapping("/category/{category}")
    public List<Expense> getExpensesByCategory(
            @PathVariable String category) {
        return expenseService.getExpensesByCategory(category);
    }
    @GetMapping("/filter")
    public List<Expense> getExpensesByDateRange(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {

        return expenseService.getExpensesByDateRange(
                startDate, endDate);
    }
}
