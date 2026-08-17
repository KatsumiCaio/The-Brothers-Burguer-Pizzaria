/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { MenuItem, MenuCategory, CartItem, CartItemOption } from './types';
import { TopAnnouncementBar } from './components/TopAnnouncementBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PillarsSection } from './components/PillarsSection';
import { InteractiveMenu } from './components/InteractiveMenu';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { FridayRodizioSection } from './components/FridayRodizioSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ReservationModal } from './components/ReservationModal';

export default function App() {
  // Navigation & Category state
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('mais_pedidos');

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  // Computed Cart values
  const cartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  }, [cartItems]);

  const cartItemIds = useMemo(() => {
    return new Set(cartItems.map((item) => item.menuItem.id));
  }, [cartItems]);

  // Cart Actions
  const handleOpenProductModal = (item: MenuItem) => {
    setSelectedProduct(item);
    setIsProductModalOpen(true);
  };

  const handleAddToCart = (item: MenuItem, quantity: number, options: CartItemOption) => {
    let crustPrice = 0;
    if (options.pizzaCrust && options.pizzaCrust.includes('(+R$ 8,00)')) {
      crustPrice = 8.00;
    }
    const extrasTotal = options.selectedExtras.reduce((acc, extra) => acc + extra.price, 0);
    const unitPrice = item.price + crustPrice + extrasTotal;
    const totalPrice = unitPrice * quantity;

    const cartItemId = `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

    const newItem: CartItem = {
      cartItemId,
      menuItem: item,
      quantity,
      options,
      unitPrice,
      totalPrice,
    };

    setCartItems((prev) => [...prev, newItem]);
  };

  const handleDirectAdd = (item: MenuItem) => {
    const existingIndex = cartItems.findIndex(
      (ci) =>
        ci.menuItem.id === item.id &&
        !ci.options.breadType &&
        !ci.options.meatDoneness &&
        ci.options.selectedExtras.length === 0 &&
        (!ci.options.notes || ci.options.notes === '')
    );

    if (existingIndex > -1) {
      setCartItems((prev) =>
        prev.map((ci, idx) => {
          if (idx === existingIndex) {
            const newQty = ci.quantity + 1;
            return {
              ...ci,
              quantity: newQty,
              totalPrice: ci.unitPrice * newQty,
            };
          }
          return ci;
        })
      );
    } else {
      const newItem: CartItem = {
        cartItemId: `${item.id}-${Date.now()}`,
        menuItem: item,
        quantity: 1,
        options: {
          selectedExtras: [],
        },
        unitPrice: item.price,
        totalPrice: item.price,
      };
      setCartItems((prev) => [...prev, newItem]);
    }
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: item.unitPrice * newQuantity,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToMenu = () => {
    const menuEl = document.getElementById('cardapio');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0B0A] text-[#FDFBF7] flex flex-col font-sans-body antialiased">
      
      {/* 1. Top Announcement Header */}
      <TopAnnouncementBar onOpenReservation={() => setIsReservationOpen(true)} />

      {/* 2. Floating Navbar */}
      <Navbar
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 3. Hero Section */}
        <Hero
          onExploreMenu={scrollToMenu}
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        {/* 4. 4 Pillars / Badges of the House */}
        <PillarsSection
          onSelectCategory={(cat) => setActiveCategory(cat as MenuCategory)}
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        {/* 5. Interactive Menu & Order Builder */}
        <InteractiveMenu
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          onOpenProductModal={handleOpenProductModal}
          onDirectAdd={handleDirectAdd}
          cartItemIds={cartItemIds}
        />

        {/* 6. Friday Rodizio Special Section */}
        <FridayRodizioSection onOpenReservation={() => setIsReservationOpen(true)} />

        {/* 7. Real Testimonials Google 4.8★ */}
        <TestimonialsSection />

        {/* 8. Location & Opening Hours */}
        <LocationHoursSection />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Modals & Drawers */}
      <ProductModal
        item={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

    </div>
  );
}
