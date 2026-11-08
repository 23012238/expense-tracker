
import { useEffect, useState } from "react";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Receipt,
  Plus,
  Search,
  Trash2,
  Pencil,
  LayoutDashboard,
  ChartPie,
  Settings,
  Bell,
  CalendarDays,
  Utensils,
  Car,
  ShoppingBag,
  Home,
  ArrowUpRight,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  getAllExpenses,
  getTotalExpenses,
  getMonthlyExpenses,
  getCategorySummary,
  addExpense,
  updateExpense,
  deleteExpense,
} from "./services/expenseService";

import "./App.css";

const COLORS = ["#7165e3", "#25b99a", "#f49b52", "#4285f4", "#e879a9"];

function getCategoryIcon(category) {
  const icons = {
    Food: Utensils,
    Travel: Car,
    Shopping: ShoppingBag,
    Housing: Home,
  };

  return icons[category] || Receipt;
}

function App() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [monthly, setMonthly] = useState(0);
  const [categoryData, setCategoryData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });

  // Load dashboard data
  const refreshDashboard = async () => {
    const today = new Date();

    const [
      expenseList,
      totalAmount,
      monthlyAmount,
      categories,
    ] = await Promise.all([
      getAllExpenses(),
      getTotalExpenses(),
      getMonthlyExpenses(
          today.getFullYear(),
          today.getMonth() + 1
      ),
      getCategorySummary(),
    ]);

    setExpenses(expenseList);
    setTotal(totalAmount);
    setMonthly(monthlyAmount);
    setCategoryData(categories);
  };

  // Initial dashboard loading
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        await refreshDashboard();
      } catch (err) {
        console.error("Dashboard loading error:", err);
        setError(
            "Unable to load expenses. Check whether the backend is running."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // Add or update expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    const expenseData = {
      ...formData,
      amount: Number(formData.amount),
    };

    try {
      if (editingId === null) {
        await addExpense(expenseData);
      } else {
        await updateExpense(editingId, expenseData);
      }

      setShowForm(false);
      setEditingId(null);

      setFormData({
        title: "",
        amount: "",
        category: "Food",
        date: new Date().toISOString().split("T")[0],
      });

      await refreshDashboard();
    } catch (err) {
      console.error("Save expense error:", err);
      alert("Could not save expense. Please try again.");
    }
  };

  // Delete expense
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
        "Are you sure you want to delete this expense?"
    );

    if (!confirmed) return;

    try {
      await deleteExpense(id);
      await refreshDashboard();
    } catch (err) {
      console.error("Delete expense error:", err);
      alert("Unable to delete expense.");
    }
  };

  // Edit expense
  const handleEdit = (expense) => {
    setEditingId(expense.id);

    setFormData({
      title: expense.title,
      amount: String(expense.amount),
      category: expense.category,
      date: expense.date,
    });

    setShowForm(true);
  };

  // Open a fresh Add Expense form
  const handleAddClick = () => {
    setEditingId(null);

    setFormData({
      title: "",
      amount: "",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
    });

    setShowForm(true);
  };

  // Search expenses
  const filteredExpenses = expenses.filter((expense) =>
      expense.title.toLowerCase().includes(search.toLowerCase())
  );

  // Prepare chart data
  const chartData = Object.entries(categoryData).map(
      ([name, value]) => ({
        name,
        value,
      })
  );

  if (loading) {
    return <div className="loading">Loading your expenses...</div>;
  }

  if (error) {
    return <div className="loading error-message">{error}</div>;
  }

  return (
      <div className="app">

        {/* Sidebar */}
        <aside className="sidebar">
          <h2 className="logo">
            Expense<span>Flow.</span>
          </h2>

          <p className="menu-label">MENU</p>

          <nav>
            <a className="nav-item active">
              <LayoutDashboard />
              Dashboard
            </a>

            <a className="nav-item">
              <Receipt />
              Transactions
            </a>

            <a className="nav-item">
              <ChartPie />
              Analytics
            </a>

            <a className="nav-item">
              <Settings />
              Settings
            </a>
          </nav>

          <div className="sidebar-bottom">
            <div className="profile-avatar">N</div>

            <div>
              <strong>My Account</strong>
              <p>Personal wallet</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">

          {/* Header */}
          <header className="topbar">
            <div>
              <h1>Dashboard</h1>
              <p>Welcome back! Here's your expense overview.</p>
            </div>

            <div className="top-actions">
              <button className="icon-button">
                <Bell />
              </button>

              <button
                  className="add-button"
                  onClick={handleAddClick}
              >
                <Plus size={18} />
                Add Expense
              </button>
            </div>
          </header>

          {/* Summary Cards */}
          <section className="summary-grid">

            <div className="summary-card">
              <div className="card-icon purple">
                <Wallet />
              </div>

              <p>Total Expenses</p>
              <h2>₹{Number(total).toFixed(2)}</h2>
              <span>All recorded expenses</span>
            </div>

            <div className="summary-card">
              <div className="card-icon green">
                <CalendarDays />
              </div>

              <p>Monthly Expenses</p>
              <h2>₹{Number(monthly).toFixed(2)}</h2>

              <span>
              {new Date().toLocaleString("en-IN", {
                month: "long",
                year: "numeric",
              })}
            </span>
            </div>

            <div className="summary-card">
              <div className="card-icon orange">
                <TrendingDown />
              </div>

              <p>Total Transactions</p>
              <h2>{expenses.length}</h2>
              <span>Recorded expenses</span>
            </div>

          </section>

          {/* Charts and Transactions */}
          <section className="content-grid">

            {/* Category Chart */}
            <div className="panel chart-panel">

              <div className="panel-heading">
                <div>
                  <h3>Spending by Category</h3>
                  <p>Category-wise expense distribution</p>
                </div>

                <ChartPie />
              </div>

              <div className="chart-container">

                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={240}>
                      <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={65}
                            outerRadius={95}
                            paddingAngle={4}
                        >
                          {chartData.map((entry, index) => (
                              <Cell
                                  key={entry.name}
                                  fill={COLORS[index % COLORS.length]}
                              />
                          ))}
                        </Pie>

                        <Tooltip
                            formatter={(value) => `₹${value}`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <p>No category expenses available.</p>
                )}

              </div>

              <div className="legend">
                {chartData.map((item, index) => (
                    <div className="legend-item" key={item.name}>
                  <span
                      style={{
                        background: COLORS[index % COLORS.length],
                      }}
                  />

                      {item.name}

                      <strong>₹{item.value}</strong>
                    </div>
                ))}
              </div>

            </div>

            {/* Recent Transactions */}
            <div className="panel transactions-panel">

              <div className="panel-heading">
                <div>
                  <h3>Recent Transactions</h3>
                  <p>Your latest expense records</p>
                </div>

                <ArrowUpRight />
              </div>

              <div className="search-box">
                <Search size={17} />

                <input
                    placeholder="Search expenses..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />
              </div>

              {filteredExpenses.length > 0 ? (
                  [...filteredExpenses].reverse().map((expense) => {
                    const Icon = getCategoryIcon(expense.category);

                    return (
                        <div className="transaction" key={expense.id}>

                          <div className="transaction-icon">
                            <Icon />
                          </div>

                          <div className="transaction-details">
                            <strong>{expense.title}</strong>
                            <span>
      {expense.category} • {expense.date}
    </span>
                          </div>

                          <div className="transaction-actions">
                            <strong className="amount">
                              -₹{Number(expense.amount).toFixed(2)}
                            </strong>

                            <button
                                className="edit-button"
                                onClick={() => handleEdit(expense)}
                                title="Edit expense"
                            >
                              <Pencil size={16} />
                            </button>

                            <button
                                className="delete-button"
                                onClick={() => handleDelete(expense.id)}
                                title="Delete expense"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                        </div>
                    );
                  })
              ) : (
                  <p>No expenses found.</p>
              )}

            </div>

          </section>

          {/* Add / Edit Expense Modal */}
          {showForm && (
              <div className="modal-overlay">

                <div className="modal">

                  <h3>
                    {editingId !== null
                        ? "Edit Expense"
                        : "Add New Expense"}
                  </h3>

                  <p>Enter your expense details below.</p>

                  <form
                      onSubmit={handleSubmit}
                      className="expense-form"
                  >

                    <label>Expense Title</label>

                    <input
                        type="text"
                        placeholder="e.g. Lunch"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({
                              ...formData,
                              title: e.target.value,
                            })
                        }
                        required
                    />

                    <label>Amount (₹)</label>

                    <input
                        type="number"
                        placeholder="Enter amount"
                        min="0.01"
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) =>
                            setFormData({
                              ...formData,
                              amount: e.target.value,
                            })
                        }
                        required
                    />

                    <label>Category</label>

                    <select
                        value={formData.category}
                        onChange={(e) =>
                            setFormData({
                              ...formData,
                              category: e.target.value,
                            })
                        }
                        required
                    >
                      <option value="">Select category</option>
                      <option value="Food">Food</option>
                      <option value="Travel">Travel</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Housing">Housing</option>
                      <option value="Other">Other</option>
                    </select>

                    <label>Date</label>

                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                            setFormData({
                              ...formData,
                              date: e.target.value,
                            })
                        }
                        required
                    />

                    <div className="form-buttons">

                      <button
                          type="submit"
                          className="add-button"
                      >
                        {editingId !== null
                            ? "Update Expense"
                            : "Save Expense"}
                      </button>

                      <button
                          type="button"
                          className="cancel-button"
                          onClick={() => {
                            setShowForm(false);
                            setEditingId(null);
                          }}
                      >
                        Cancel
                      </button>

                    </div>

                  </form>

                </div>
              </div>
          )}

        </main>
      </div>
  );
}

export default App;
