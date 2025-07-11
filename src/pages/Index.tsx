import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: "Липовый мёд",
      price: 850,
      description:
        "Натуральный липовый мёд с нежным ароматом и целебными свойствами",
      image: "/img/1a62ec04-a2f7-42bc-bf73-284d3033aa29.jpg",
      category: "Мёд",
    },
    {
      id: 2,
      name: "Гречишный мёд",
      price: 950,
      description: "Тёмный гречишный мёд, богатый железом и антиоксидантами",
      image: "/img/1a62ec04-a2f7-42bc-bf73-284d3033aa29.jpg",
      category: "Мёд",
    },
    {
      id: 3,
      name: "Прополис",
      price: 450,
      description:
        "Натуральный прополис - природный антибиотик для укрепления иммунитета",
      image: "/img/734dffa7-e03e-46d4-84ab-31e78495e36a.jpg",
      category: "Пчелопродукты",
    },
    {
      id: 4,
      name: "Восковые свечи",
      price: 320,
      description: "Ароматные свечи из натурального пчелиного воска",
      image: "/img/734dffa7-e03e-46d4-84ab-31e78495e36a.jpg",
      category: "Пчелопродукты",
    },
    {
      id: 5,
      name: "Маточное молочко",
      price: 1200,
      description: "Свежее маточное молочко - источник витаминов и энергии",
      image: "/img/734dffa7-e03e-46d4-84ab-31e78495e36a.jpg",
      category: "Пчелопродукты",
    },
    {
      id: 6,
      name: "Перга",
      price: 680,
      description: "Пчелиная перга - суперфуд для здоровья и долголетия",
      image: "/img/734dffa7-e03e-46d4-84ab-31e78495e36a.jpg",
      category: "Пчелопродукты",
    },
  ];

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🍯</div>
              <div>
                <h1 className="text-2xl font-bold text-amber-900">
                  Золотая Пасека
                </h1>
                <p className="text-sm text-amber-700">
                  Натуральные продукты пчеловодства
                </p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#hero"
                className="text-amber-800 hover:text-amber-600 transition-colors"
              >
                Главная
              </a>
              <a
                href="#catalog"
                className="text-amber-800 hover:text-amber-600 transition-colors"
              >
                Каталог
              </a>
              <a
                href="#contacts"
                className="text-amber-800 hover:text-amber-600 transition-colors"
              >
                Контакты
              </a>
            </nav>

            <Button
              onClick={() => setIsCartOpen(true)}
              variant="outline"
              className="relative border-amber-300 text-amber-800 hover:bg-amber-100"
            >
              <Icon name="ShoppingCart" size={20} />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-amber-600 text-white">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-5xl lg:text-6xl font-bold text-amber-900 mb-6">
                Натуральный мёд
                <span className="text-amber-600">прямо с пасеки</span>
              </h2>
              <p className="text-xl text-amber-800 mb-8 leading-relaxed">
                Более 15 лет мы производим экологически чистые продукты
                пчеловодства. Каждая баночка мёда содержит всю силу природы и
                заботу наших пчёл.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Icon name="ShoppingBag" className="mr-2" size={20} />
                  Перейти в каталог
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-300 text-amber-800 hover:bg-amber-100"
                >
                  <Icon name="Phone" className="mr-2" size={20} />
                  Связаться с нами
                </Button>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-3xl transform rotate-3"></div>
              <img
                src="/img/1a62ec04-a2f7-42bc-bf73-284d3033aa29.jpg"
                alt="Натуральный мёд"
                className="relative z-10 w-full rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Star" className="text-amber-500" size={20} />
                  <span className="font-semibold text-amber-900">4.9/5</span>
                </div>
                <p className="text-sm text-amber-700">Более 500 отзывов</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 hover:bg-white/80 rounded-2xl transition-all hover:shadow-lg hover:scale-105">
              <div className="text-4xl mb-4">🐝</div>
              <h3 className="text-xl font-semibold text-amber-900 mb-3">
                100% Натуральный
              </h3>
              <p className="text-amber-700">
                Без добавок и консервантов. Только чистый мёд от наших пчёл.
              </p>
            </div>
            <div className="text-center p-6 hover:bg-white/80 rounded-2xl transition-all hover:shadow-lg hover:scale-105">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold text-amber-900 mb-3">
                Быстрая доставка
              </h3>
              <p className="text-amber-700">
                Доставим свежий мёд в течение 1-2 дней по всей России.
              </p>
            </div>
            <div className="text-center p-6 hover:bg-white/80 rounded-2xl transition-all hover:shadow-lg hover:scale-105">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-amber-900 mb-3">
                Качество
              </h3>
              <p className="text-amber-700">
                Сертифицированная продукция с гарантией качества.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
              Наши продукты
            </h2>
            <p className="text-xl text-amber-700 max-w-2xl mx-auto">
              Выберите из широкого ассортимента натуральных продуктов
              пчеловодства
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white border-amber-200"
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-amber-600 text-white">
                      {product.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl text-amber-900 mb-2">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-amber-700 mb-4">
                    {product.description}
                  </CardDescription>
                  <div className="text-2xl font-bold text-amber-600">
                    {product.price} ₽
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    onClick={() => addToCart(product)}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    <Icon name="Plus" className="mr-2" size={16} />В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/50"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="w-96 bg-white h-full shadow-2xl animate-slide-in-right flex flex-col">
            <div className="p-6 border-b border-amber-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-amber-900">
                  Корзина
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCartOpen(false)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <Icon
                    name="ShoppingCart"
                    size={48}
                    className="mx-auto text-amber-300 mb-4"
                  />
                  <p className="text-amber-700">Корзина пуста</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-amber-900">
                          {item.name}
                        </h4>
                        <p className="text-amber-600">{item.price} ₽</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Icon name="Minus" size={12} />
                          </Button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Icon name="Plus" size={12} />
                          </Button>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-amber-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-amber-900">
                    Итого:
                  </span>
                  <span className="text-xl font-bold text-amber-600">
                    {getTotalPrice()} ₽
                  </span>
                </div>
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  Оформить заказ
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Contacts */}
      <section
        id="contacts"
        className="py-20 bg-gradient-to-r from-amber-600 to-orange-600"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">Свяжитесь с нами</h2>
              <p className="text-xl mb-8 text-amber-100">
                Есть вопросы о нашем мёде или хотите разместить большой заказ?
                Мы всегда готовы помочь!
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={20} className="text-amber-200" />
                  <span className="text-amber-100">+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={20} className="text-amber-200" />
                  <span className="text-amber-100">
                    info@zolotaya-paseka.ru
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={20} className="text-amber-200" />
                  <span className="text-amber-100">
                    Московская область, Пушкинский район
                  </span>
                </div>
              </div>
            </div>

            <Card className="bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-amber-900">Написать нам</CardTitle>
                <CardDescription>
                  Оставьте заявку и мы свяжемся с вами в течение часа
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Ваше имя" className="border-amber-200" />
                <Input placeholder="Телефон" className="border-amber-200" />
                <Input placeholder="Email" className="border-amber-200" />
                <Textarea
                  placeholder="Ваше сообщение"
                  rows={4}
                  className="border-amber-200"
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  <Icon name="Send" className="mr-2" size={16} />
                  Отправить сообщение
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-2xl">🍯</div>
                <span className="text-xl font-bold text-white">
                  Золотая Пасека
                </span>
              </div>
              <p className="text-amber-200">
                Натуральные продукты пчеловодства высочайшего качества с 2008
                года.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Каталог</h4>
              <ul className="space-y-2 text-amber-200">
                <li>Мёд</li>
                <li>Пчелопродукты</li>
                <li>Подарочные наборы</li>
                <li>Косметика</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                Информация
              </h4>
              <ul className="space-y-2 text-amber-200">
                <li>Доставка и оплата</li>
                <li>Возврат и обмен</li>
                <li>Сертификаты</li>
                <li>Оптовым покупателям</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-amber-800 mt-8 pt-8 text-center text-amber-300">
            <p>&copy; 2024 Золотая Пасека. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
