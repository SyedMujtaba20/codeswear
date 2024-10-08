import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState, useEffect } from "react";
import {
  AiOutlineShoppingCart,
  AiFillCloseCircle,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({
  user,
  cart,
  addToCart,
  removeFromCart,
  clearCart,
  subTotal,
  Logout,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const router = useRouter();
  useEffect(() => {
    Object.keys(cart).length !== 0 && setSidebar(true);
    let exempted = ["/checkout", "/order", "/orders", "/myaccount"];
    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }
  }, [router.pathname]);
  const toggleDropDown = () => {
    setDropdown(!dropdown);
  };
  const toggleCart = () => {
    setSidebar(!sidebar);
    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full");
    //   ref.current.classList.add("translate-x-0");
    // } else if (!ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-0");
    //   ref.current.classList.add("translate-x-full");
    // }
  };
  const ref = useRef();
  return (
    <>
      {!sidebar && (
        <span
          className="fixed right-9 top-4  cursor-pointer flex justify-center z-50"
          onMouseOver={() => {
            setDropdown(true);
          }}
          onMouseLeave={() => {
            setDropdown(false);
          }}
        >
          {dropdown && (
            <div className="absolute right-5 bg-white shadow-lg border top-5 py-4 rounded-md px-5 w-32 z-30">
              <ul>
                <Link href={"/myaccount"}>
                  <li className="py-1 hover:text-pink-700 text-sm font-bold">
                    My Account
                  </li>
                </Link>
                <Link href={"/orders"}>
                  <li className="py-1 hover:text-pink-700 text-sm font-bold">
                    My Orders
                  </li>
                </Link>
                <li
                  onClick={Logout}
                  className="py-1 hover:text-pink-700 text-sm font-bold"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}

          {user.value && (
            <MdAccountCircle className="text-xl md:text-2xl fixed right-8 mx-8 z-30" />
          )}
        </span>
      )}
      <div
        className={`flex flex-col md:flex-row md:justify-start justify-center items-center  py-2 shadow-md sticky top-0 bg-white ${
          !sidebar && "overflow-hidden"
        }`}
        style={{ height: "70px" }}
      >
        <div className="logo mr-auto  md:mx-5">
          <Link href={"/"}>
            <Image src="/logo.png" alt="" width={100} height={20} />
          </Link>
        </div>
        <div className="nav">
          <ul className="flex items-center space-x-6 font-bold md:text-md">
            <Link href={"/tshirts"}>
              <li className="hover:text-pink-600">Tshirts</li>
            </Link>
            <Link href={"/hoodies"}>
              <li className="hover:text-pink-600">Hoodies</li>
            </Link>
            <Link href={"/stickers"}>
              <li className="hover:text-pink-600">Stickers</li>
            </Link>
            <Link href={"/mugs"}>
              <li className="hover:text-pink-600">Mugs</li>
            </Link>
          </ul>
        </div>
        <div className="cursor-pointer items-center cart absolute top-4 right-0 mx-5 flex">
          {!user.value && (
            <Link href={"/login"}>
              <button className="bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-5">
                Login
              </button>
            </Link>
          )}

          <AiOutlineShoppingCart
            onClick={toggleCart}
            className="text-xl md:text-2xl mx-2 "
          />
        </div>

        <div
          ref={ref}
          className={`w-72 h-[100vh] sideCart overflow-y-scroll z-30 absolute top-0 bg-pink-100 px-8 py-10 transition-all ${
            sidebar ? "right-0 " : "-right-96 "
          }translate-x-0`}
        >
          <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
          <span
            onClick={toggleCart}
            className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
          >
            <AiFillCloseCircle />
          </span>
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).length === 0 && (
              <div className="my-4 font-semibold">Your cart is Empty!</div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex my-5">
                    <div className="w-2/3 font-semibold">
                      {cart[k].name} ({cart[k].size}/{cart[k].variant})
                    </div>
                    <div className="flex items-center justify-center w-1/3 text-lg">
                      <AiFillMinusCircle
                        onClick={() => {
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer text-pink-500"
                      />
                      <span className="mx-1 text-sm">{cart[k].qty}</span>
                      <AiFillPlusCircle
                        onClick={() => {
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          );
                        }}
                        className="cursor-pointer text-pink-500"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="font-bold my-2">Subtotal: {subTotal}</div>
          <div className="flex">
            <Link href={"/checkout"}>
              <button
                disabled={Object.keys(cart).length === 0}
                className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
              >
                <BsFillBagCheckFill className="m-1" /> Checkout
              </button>
            </Link>
            <button
              disabled={Object.keys(cart).length === 0}
              onClick={clearCart}
              className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
