import React, { useState, useEffect } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheckCircle,
  faCircle,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { ogp } from "./ogp.js"
import "./ogp"





const App = () => {
  // itemsのuseStateを作る
  // 初期状態は空のオブジェクト
  const [items, setItems] = useState([]);

  // 入力値のuseStateを作る
  // [関数,関数の定義]=useState([])
  const [inputValue, setInputValue] = useState("");

  // 総量のuseStateを作る
  // 初期値は０
  const [totalItemCount, setTotalItemCount] = useState(0);

  const calculateTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    setTotalItemCount(totalItemCount);
  }

  // クリック時にitems配列に新しいitemを作る処理
  const handleAddButtonClick = () => {
    // 作られるitemの定義
    const newItem = {
      itemName: inputValue,
      quantity: 1,
      isSelected: false,
    };

    // items配列にpushされる
    const newItems = [...items, newItem];

    // useStateのitemsに反映
    setItems(newItems);

    // 入力値を空に
    setInputValue("");

    calculateTotal();

    // OGP
    const url = { inputValue };
    fetch(url).then(res => res.text()).then(text => {
      const el = new DOMParser().parseFromString(text, "text/html")
      const headEls = (el.head.children)
      Array.from(headEls).map(v => {
        const prop = v.getAttribute('property')
        if (!prop) return;
        console.log(prop, v.getAttribute("content"))
      })
    })
  }

  // done切り替え
  const toggleComplete = (index) => {
    // itemsを展開した配列、newItemsを作る
    const newItems = [...items];
    // 引数にindexから、該当するitemsのisSelectedを切り替える
    newItems[index].isSelected = !newItems[index].isSelected;
    setItems(newItems)
  }

  const handleQuantityIncrease = (index) => {
    // itemsを展開した配列、newItemsを作る
    const newItems = [...items];
    // quantityに+1する
    newItems[index].quantity++;
    setItems(newItems);
    calculateTotal();
  }

  const handleQuantityDecrease = (index) => {
    // itemsを展開した配列、newItemsを作る
    const newItems = [...items];
    // quantityに-1する
    newItems[index].quantity--;
    setItems(newItems);
    calculateTotal();
  }

  return (
    <div className="app-background" >
      <div className="main-container">
        <h2>買い物リスト</h2>
        <div className="add-item-box">
          <input value={inputValue}
            onChange={(event) => setInputValue(event.target.value)} className="add-item-input" placeholder="買うものを入れてね" />
          <FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()} />
        </div>

        <div className="item-list">
          {items.map((item, index) => (
            <div className="item-container">
              <div className="item-name" onClick={() => toggleComplete(index)}>
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span className="completed">{item.itemName}</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCircle} />
                    <span>{item.itemName}</span>
                  </>
                )}
              </div>

              <div className='quantity'>
                <button>
                  <FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(index)} />
                </button>
                <span> {item.quantity} </span>
                <button>
                  <FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)} />
                </button>
              </div>

            </div>
          ))}
          <div className="item-container"></div>
        </div>
        <div className="total">Total: {totalItemCount}</div>
      </div>
    </div >
  );
};

export default App;