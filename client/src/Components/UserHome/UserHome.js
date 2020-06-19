import React, { useEffect } from 'react';
import axios from 'axios';

export const UserHome = (props) => {

    const authToken = props.authToken;
    console.log(authToken);

    useEffect(() => {
        const authorize = () => {
            const data = '';
            
            console.log("fetching")
            console.log(authToken)
            
            const config = {
                method: 'get',
                url: 'http://localhost:4321/report/user/reports',
                headers: {
                    'Authorization': 'Bearer ' + authToken
                },
                data
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        if (authToken) {
            authorize();
        }

    }, [authToken]);

    console.log("render");
    
    return(
        <div className="content">
            {/*<div th:replace="~{fragments/search :: search}"></div>*/}
            <table className="table-condensed table table-hover">
                <caption>Reports List</caption>
                <thead>
                <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Status</td>
                    <td>Created</td>
                    <td>Updated</td>
                    <td></td>
                    <td></td>
                </tr>
                </thead>
                <tbody>
                <tr className="accordion-toggle" data-toggle="collapse"></tr>
        {/*<tr>*/}
        {/*    <td colSpan="7" className="hiddenRow">*/}
        {/*        <div className="accordian-body collapse" th:id="${report.getId()}">*/}
        {/*            <div th:text="${report.getDescription()}"></div>*/}
        {/*            <div style="background-color: #ffdfd4; border-top: 0.5px solid grey;"*/}
        {/*                 th:if="${report.getDeclineReason() != null and report.getStatus().name().equals('NOT_ACCEPTED')}"*/}
        {/*                 th:text="#{string.reason.toggle} + ${report.getDeclineReason()}"></div>*/}
        {/*        </div>*/}
        {/*        </td>*/}
        {/*</tr>*/}
                </tbody>
            </table>
            <a href="/userHome/add">
                <button type="button" className="btn btn-outline-success btn-lg">
                    Add
                </button>
            </a>

        {/*    <nav th:if="${reports.getTotalPages() != 0}" style="display: flex; justify-content: center"*/}
        {/*         aria-label="Page navigation example">*/}
        {/*        <ul className="pagination">*/}
        {/*<span th:each="page: ${#numbers.sequence(0, reports.getTotalPages() - 1)}">*/}
        {/*    <li className="page-item"><a className="page-link" th:href="'?page=' + ${page}"*/}
        {/*                                 th:text="${page + 1}"></a></li>*/}
        {/*</span>*/}
        {/*        </ul>*/}
        {/*    </nav>*/}
        </div>
    )
}