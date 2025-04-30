import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {selectTransactions} from "../../redux/transactions/selectors";
import s from "./TransactionsList.module.css";
import useMedia from "../../helpers/useMedia";
import {getTransactions, getCategories} from "../../redux/transactions/operations";

import TransactionsItem from "../TransactionsItem/TransactionsItem";
import {setPage, useTransactionsPagination} from "../../redux/transactions/slice";
import ReactPaginate from "react-paginate";

const columns = ["Date", "Type", "Category", "Comment", "Sum", "", ""];

function EmptyStateMessage() {
  return (
    <>
      <p className={s.emptyText}>No transaction yet.</p>
      <p className={s.emptyText}>Let&apos;s add your first transaction!</p>
    </>
  );
}

function TransactionsList() {
  const reduxTransactions = useSelector(selectTransactions);
  const pagination = useTransactionsPagination();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactions(pagination.page + 1));
    dispatch(getCategories());
  }, [dispatch, pagination.page]);

  const {isMobile} = useMedia();

  if (isMobile) {
    return (
      <div className={s.mobileContainer}>
        <div className={`${s.mobileScrollList} ${s.scroll}`}>
          {reduxTransactions.length ? (
            reduxTransactions.map((item) => (
              <TransactionsItem
                key={item._id}
                transaction={item}
              />
            ))
          ) : (
            <EmptyStateMessage />
          )}
        </div>
        <div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={(page) => dispatch(setPage(page.selected))}
            pageRangeDisplayed={1}
            pageCount={pagination.totalPage}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            activeClassName={s.pageActive}
            disabledClassName={s.pageButtonDisabled}
            className={s.pageContainer}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={s.tableContainer}>
      <table className={s.table}>
        <thead className={s.head_row}>
          <tr className={s.row_item}>
            {columns.map((column, idx) => (
              <th key={idx}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reduxTransactions.length ? (
            reduxTransactions.map((item) => (
              <TransactionsItem
                key={item._id}
                transaction={item}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className={s.emptyCell}>
                <EmptyStateMessage />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={(page) => dispatch(setPage(page.selected))}
          pageRangeDisplayed={1}
          pageCount={pagination.totalPage}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          activeClassName={s.pageActive}
          disabledClassName={s.pageButtonDisabled}
          className={s.pageContainer}
        />
      </div>
    </div>
  );
}

export default TransactionsList;
