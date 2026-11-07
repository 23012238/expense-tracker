
package com.expensetracker.expense_tracker.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.time.YearMonth;
import com.expensetracker.expense_tracker.model.Expense;
import com.expensetracker.expense_tracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    // Constructor injection
    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    // Add expense to PostgreSQL
    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    // Get all expenses from PostgreSQL
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public List<Expense> getExpensesByDateRange(
            LocalDate startDate, LocalDate endDate) {

        return expenseRepository.findAll()
                .stream()
                .filter(expense ->
                        !expense.getDate().isBefore(startDate)
                                && !expense.getDate().isAfter(endDate))
                .toList();
    }
    public double getTotalExpenses() {
        return expenseRepository.findAll()
                .stream()
                .mapToDouble(Expense::getAmount)
                .sum();
    }
    public double getMonthlyExpenses(int year, int month) {
        YearMonth yearMonth = YearMonth.of(year, month);

        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();

        return expenseRepository.findAll().stream()
                .filter(expense ->
                        !expense.getDate().isBefore(startDate)
                                && !expense.getDate().isAfter(endDate))
                .mapToDouble(Expense::getAmount)
                .sum();
    }
    // Get one expense by ID
    public Expense getExpenseById(Long id) {
        return expenseRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Expense not found"));
    }
    // Update an existing expense
    public Expense updateExpense(Long id, Expense updatedExpense) {

        Expense existingExpense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Expense not found"));

        existingExpense.setTitle(updatedExpense.getTitle());
        existingExpense.setAmount(updatedExpense.getAmount());
        existingExpense.setCategory(updatedExpense.getCategory());
        existingExpense.setDate(updatedExpense.getDate());

        return expenseRepository.save(existingExpense);
    }
    // Delete an expense
    public void deleteExpense(Long id) {

        Expense existingExpense = expenseRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Expense not found"));

        expenseRepository.delete(existingExpense);
    }
    public Map<String, Double> getCategoryWiseExpenses() {

        return expenseRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(
                        Expense::getCategory,
                        Collectors.summingDouble(Expense::getAmount)
                ));
    }
    public List<Expense> getExpensesByCategory(String category) {
        return expenseRepository.findAll()
                .stream()
                .filter(expense ->
                        expense.getCategory().equalsIgnoreCase(category))
                .toList();
    }
}
