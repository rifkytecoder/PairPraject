const rupiah = (value) => {
  return value.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
};

module.exports = rupiah;
