let storage, _storage = {};

/**
 * 检测storage 是否可用
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
function detect(type) {
  try {
    let storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

storage = {
  hasLocalStorage: detect('localStorage'),

  /**
   * 获取对应 key 的 value 值
   * @param    {string}                key key值
   * @return   {[type]}                返回对应的 value 值
   */
  getItem: function (key) {
    let obj;

    if (this.hasLocalStorage) {
      let value = localStorage.getItem(key);
      try {
        obj = JSON.parse(value);
      } catch (e) {
        obj = value;
      }
    } else {
      obj = _storage[key];
    }

    if (obj && obj.data) {
      if (!('expire' in obj) || obj.expire > (new Date()).getTime()) {
        return obj.data;
      }
      this.removeItem(key);
    }
    return null;
  },

  /**
   * set item
   * @param    {stirng}                key    key值
   * @param    {object}                value  值
   * @param    {number}                expire 过期时间，单位毫秒
   */
  setItem: function (key, value, expire) {
    let obj = {
      data: value
    };

    if (expire && expire > 0) {
      obj.expire = (new Date()).getTime() + expire;
    }

    if (this.hasLocalStorage) {
      localStorage.setItem(key, JSON.stringify(obj));
    } else {
      _storage[key] = obj;
    }
    return value;
  },

  /**
   * 删除对应 key 值
   * @param    {string}                key key 值
   * @return   {null}
   */
  removeItem: function (key) {
    if (this.hasLocalStorage) {
      localStorage.removeItem(key);
    } else {
      delete _storage[key];
    }
  },

  /**
   * 返回所有的 keys
   * @return   {array}                返回 key 值数组
   */
  getKeys: function () {
    let keys = [];
    if (this.hasLocalStorage) {
      for (let key in localStorage) {
        keys.push(key);
      }
    } else {
      for (let key in _storage) {
        keys.push(key);
      }
    }

    return keys;
  },

  removeExpired: function () {
    if (this.hasLocalStorage) {
      for (let key in localStorage) {
        this.getItem(key);
      }
    } else {
      for (let key in _storage) {
        this.getItem(key);
      }
    }
  }
};

export default storage;
