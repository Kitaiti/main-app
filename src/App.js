import React, { useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheckCircle,
  faCircle,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
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

    console.log(totalItemCount);

    setTotalItemCount(totalItemCount);
  }

  // クリック時にitems配列に新しいitemを作る処理
  const handleAddButtonClick = () => {
    // 作られるitemの定義
    const newItem = {
      itemName: inputValue,
      quantity: 0,
      isSelected: false,
    };

    // items配列にpushされる
    const newItems = [...items, newItem];

    // useStateのitemsに反映
    setItems(newItems);

    // 入力値を空に
    setInputValue("");

    calculateTotal();

  }


  // done切り替え
  const toggleComplete = (index) => {
    // itemsを展開した配列、newItemsを作る
    const newItems = [...items];
    // 引数にindexから、該当するitemsのisSelectedを切り替える
    newItems[index].isSelected = !newItems[index].isSelected;
    setItems(newItems)
  }

  // 総量を削除


  // 購入済みを削除
  const deleteTodo = (i) => {
    const newItems = [...items]
    const res = newItems.filter(({ isSelected }) => !isSelected);
    setItems(res);
    console.log(res)

    const comp = newItems.filter(({ isSelected }) => isSelected);
    console.log(comp, comp.length);

    let compItem = totalItemCount;
    console.log(compItem);

    for (let i = 0; i < comp.length; i++) {
      let qua = comp[i].quantity;
      console.log(qua);
      compItem = compItem - qua;
      console.log(compItem);
      setTotalItemCount(compItem);
    }
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
            onChange={(event) => setInputValue(event.target.value)} className="add-item-input" placeholder="買うもの" />
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
        <div className="btn">
          <input type="button" value="購入済みを削除" className="deletebtn" onClick={() => deleteTodo()} />
        </div>
      </div>
    </div >
  );
};

export default App;