const transactions = {
  items: [],
  category: [],
  isLoading: false,
  isError: false,
  currentTransaction: null,
  deleteTransaction: null,
};

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.isError = action.payload;
};

const contactsSlice = createSlice({
  name: "transaction",
  initialState: transactions,
  reducers: {
    setCurrentTransaction(state, action) {
      state.currentTransaction = action.payload;
    },
    setDeleteTransaction(state, action) {
      state.deleteTransaction = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder;
    //.addCase
  },
});
