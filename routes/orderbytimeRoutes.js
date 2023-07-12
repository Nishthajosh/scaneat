const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// Get the number of orders placed per hour in a day
router.get('/orders-by-hour', async (req, res) => {
  try {
    const ordersByHour = await Order.aggregate([
      {
        $match: {
          timestamp: {
            $gte: new Date().setHours(0, 0, 0, 0), // Start of today
            $lt: new Date().setHours(23, 59, 59, 999), // End of today
          },
        },
      },
      {
        $group: {
          _id: { $hour: '$timestamp' },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const ordersByHourMap = new Map();
    for (const order of ordersByHour) {
      ordersByHourMap.set(`${order._id}:00`, order.count);
    }

    res.json({ success: true, ordersByTime: { hourly: Object.fromEntries(ordersByHourMap) } });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Error getting orders by hour' });
  }
});

// Get the number of orders placed per minute in a day
router.get('/orders-by-minute', async (req, res) => {
  try {
    const ordersByMinute = await Order.aggregate([
      {
        $match: {
          timestamp: {
            $gte: new Date().setHours(0, 0, 0, 0), // Start of today
            $lt: new Date().setHours(23, 59, 59, 999), // End of today
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%H:%M', date: '$timestamp' } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const ordersByMinuteMap = new Map();
    for (const order of ordersByMinute) {
      ordersByMinuteMap.set(order._id, order.count);
    }

    res.json({ success: true, ordersByTime: { minutely: Object.fromEntries(ordersByMinuteMap) } });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Error getting orders by minute' });
  }
});

module.exports = router;
