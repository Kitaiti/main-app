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


  // priceの総量のuseState
  const [PriceCount, setPriceCount] = useState(0);

  // 金額のuseState
  const [Price, setPrice] = useState("");

  const calculatePrice = () => {
    const PriceCount = items.reduce((total, item) => {
      return (parseInt(item.Price, 10) * item.quantity) + total;
    }, 0);

    console.log(PriceCount);
    setPriceCount(PriceCount);
  }

  const zeroPrice = () => {
    const Zeroprice = items.reduce((total, item) => {
      return 0 + total;
    }, 0);

    console.log(Zeroprice);
    setPriceCount(Zeroprice);
  }


  const deletePrice = () => {
    const PriceCount = items.reduce((total, item) => {
      return (parseInt(item.Price, 10) * item.quantity) + total;
    }, 0);

    console.log(PriceCount);
    setPriceCount(PriceCount);
  }

  const calculateTotal = () => {
    const totalItemCount = items.reduce((total, item) => {
      return item.quantity + total;
    }, 0);

    console.log(totalItemCount);

    setTotalItemCount(totalItemCount);
  }

  const countSum = () => {
    const Countsum = items.reduce((total, item) => {
      return item.quantity + total;
    }, 1);

    console.log(Countsum);
    setTotalItemCount(Countsum);
  }

  const priceSum = () => {
    const Pricesum = items.reduce((total, item) => {
      return (parseInt(item.Price, 10) * item.quantity) + total;
    }, parseInt(toHalfWidth(Price)));

    setPriceCount(Pricesum);
    console.log(Pricesum);
  }

  /**
 * 全角から半角への変革関数
 * 入力値の英数記号を半角変換して返却
 * [引数]   strVal: 入力値
 * [返却値] String(): 半角変換された文字列
 */
  function toHalfWidth(strVal) {
    // 半角変換
    var halfVal = strVal.replace(/[！-～]/g,
      function (tmpStr) {
        // 文字コードをシフト
        return String.fromCharCode(tmpStr.charCodeAt(0) - 0xFEE0);
      }
    );

    // 文字コードシフトで対応できない文字の変換
    return halfVal.replace(/”/g, "\"")
      .replace(/’/g, "'")
      .replace(/‘/g, "`")
      .replace(/￥/g, "\\")
      .replace(/　/g, " ")
      .replace(/〜/g, "~");
  }

  // クリック時にitems配列に新しいitemを作る処理
  const handleAddButtonClick = () => {
    // 作られるitemの定義
    const newItem = {
      itemName: inputValue,
      Price: toHalfWidth(Price),
      quantity: 1,
      isSelected: false,
    };

    if (newItem.Price === "") {
      zeroPrice();
    }

    // items配列にpushされる
    const newItems = [...items, newItem];

    // useStateのitemsに反映
    setItems(newItems);

    // 入力値を空に
    setInputValue("");

    setPrice("");

    calculateTotal();

    calculatePrice();

    countSum();

    priceSum();

    console.log(newItems);
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

    let compPri = PriceCount
    console.log(PriceCount);

    for (let i = 0; i < comp.length; i++) {
      let qua = comp[i].quantity;
      console.log(qua);
      compItem = compItem - qua;
      console.log(compItem);
      setTotalItemCount(compItem);

      let pri = comp[i].Price * qua;
      console.log(pri);
      compPri = compPri - pri;
      console.log(compPri);
      setPriceCount(compPri);
    }
  }



  const handleQuantityIncrease = (index) => {
    // itemsを展開した配列、newItemsを作る
    const newItems = [...items];
    // quantityに+1する
    newItems[index].quantity++;
    setItems(newItems);
    calculateTotal();
    calculatePrice();
  }


  const handleQuantityDecrease = (index) => {
    // itemsを展開した配列、newItemsを作る
    const newItems = [...items];
    // quantityに-1する
    newItems[index].quantity--;
    setItems(newItems);
    calculateTotal();
    deletePrice();
  }




  return (
    <div className="app-background" >
      <div className="explanation">
        <ol className="explanation__list">
          <li className="explanation__text">
            購入したいものの名前と金額を入れる。
          </li>
          <li className="explanation__text">
            右の矢印で個数を設定する。
          </li>
          <li className="explanation__text">
            購入したら、丸ボタンにチェックを入れる。
          </li>
          <li className="explanation__text">
            購入したものを消す場合は左下の削除ボタンを押す。
          </li>
        </ol>
      </div>
      <div className="main-container">
        <h2>買い物リスト</h2>
        <div className="add-item-box">
          <input value={inputValue}
            onChange={(event) => setInputValue(event.target.value)} className="add-item-input" placeholder="買うもの" />
          <FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()} />
          <div className="price">
            <input type="text" id="price" placeholder="金額"
              value={Price} onChange={(event) => setPrice(event.target.value)} />
          </div>
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

              <div className="priceholder">
                <span className="text">{item.Price}</span>
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
        </div>
        <div className="total">Total: {totalItemCount}</div>
        <div className="price">Price:{PriceCount}</div>
        <div className="btn">
          <input type="button" value="購入済みを削除" className="deletebtn" onClick={() => deleteTodo()} />
        </div>
      </div>
    </div >
  );
};

export default App;