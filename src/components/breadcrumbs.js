import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';


const Breadcrumbs = () => {
    const location = useLocation();

    const breadCrumbView= () => {
        const {pathname}= location;
        const pathnames= pathname.split("/").filter((item) => item);
        console.log("Pathnames", pathname);
        const capitalize= (s) => s.charAt(0).toUpperCase() + s.slice(1);
        return (
            <div>
                <Breadcrumb separator=">>">
                {/* {pathnames.length > 0 ? (
                    <Breadcrumb.Item>
                        <Link to= "/client/dashboard">{starting}</Link>
                    </Breadcrumb.Item>
                ) : (
                    <Breadcrumb.Item>{starting}</Breadcrumb.Item>
                )} */}
                {pathnames.map((name, index)=> {
                    const routeTo= `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast= index === pathnames.length - 1;
                    console.log("Route to",routeTo);
                    return isLast ? (
                        <Breadcrumb.Item>{capitalize(name)}</Breadcrumb.Item>
                    ): (
                        <Breadcrumb.Item> 
                            <Link>{capitalize(name)}</Link>
                        </Breadcrumb.Item>
                    );
                })}
                </Breadcrumb>
            </div>
        );
    };

    return <>{breadCrumbView()}</>;
    

}

export default Breadcrumbs;