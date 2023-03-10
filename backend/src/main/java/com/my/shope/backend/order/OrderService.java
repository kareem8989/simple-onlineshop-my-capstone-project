package com.my.shope.backend.order;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepo orderRepo;


    public Optional<Order> getOrderByAppUserIdAndIsExecuted(String userId, boolean isExecuted) {
       List<Optional<Order>> orders = orderRepo.findAllByAppUserId(userId);

           for (Optional<Order> order : orders) {
               if (order.isPresent() && order.get().isExecuted() == isExecuted) {
                   return order;
               }
           }
               return Optional.empty();
    }


    public void updateOrder(Order order) {
        orderRepo.save(order);
    }


    public void save(Order newOrder) {
        orderRepo.save(newOrder);
    }
}
