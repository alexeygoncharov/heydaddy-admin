import React, { Component, Fragment } from 'react'
import {Table} from "rsuite";
import './table.css';
import SearchButton from "./SearchInput";
import TablePagination from "./TablePagination";
export default class ReactTable extends Component {

    render() {
        const   {
            activePage,
            displayLength,
            total,
            onChangePage,
            onChangeLength,
            data,
            loading,
            handleFilterChange
        } = this.props
        return (
            <Fragment>
                <SearchButton
                    handleFilterChange={handleFilterChange}
                />

                <Table autoHeight={true}
                       data={data}
                       bordered
                       cellBordered
                       virtualized={false}
                       hover={true}
                       loading={loading}
                >
                    {this.props.children}
                </Table>
                <div className='mt-4 m-2'>
                    <TablePagination
                        handleChangeLength={onChangeLength}
                        pageSizeOptions={[5, 10, 25, 50, 100]}
                        onChangePage={onChangePage}
                        showPageSizeOptions={true}
                        pageSize={displayLength}
                        canPrevious={true}
                        currentPage={activePage}
                        totalPage={Math.ceil(total/displayLength)}
                        pages={Math.ceil(total/displayLength)}
                        canNext={true}
                    />
                </div>
            </Fragment>
        )
    }
}