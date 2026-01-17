import Layout from "../../components/layout/Layout";
export default function Help() {
  return (
    <Layout>
      <div className="p-2">
        <div className="border rounded-lg p-3">
          <img src="" alt="" className="rounded-lg  border" />
        </div>

        <div className="border rounded-lg p-10 mt-3">
          <h1>About Dashboard</h1>
          <p>
            In this dashboard, you can view all the essential business insights
            at a glance — including Total Stocked Products, Total Investment,
            Total Items Sold, and items that are currently Low in Stock. This
            gives a quick and clear overview of your overall inventory health
            and sales performance. Through the line graph, you can clearly see
            the progression of sales throughout the years, helping you
            understand long-term trends and overall business growth. Through out
            the Recent Activity you can see the recent activity done by any of
            the team member.There is also a Team Section where you can see the
            number of your Working Employee and new Team request.At last you can
            see the Least Selling items from your Inventory / Stock.
          </p>
          <h1 className="font-bold">About Stock / Inventory Dashboard</h1>
          <p>
            In the Stock Dashboard you can search the product on the Product ID
            Basis or Product Name. In each table row of the product you can see
            the Add Icon + & Preview Icon & Delete Row Icon, where you can use
            add Icon to add varieties of that Product Items, you can use Preview
            icon to preview you added Items where there will also be multiple
            button like Remove Item Icon + Edit Icon + Sold Icon , also you can
            use Delete Row Icon to remove the entire row of the product.
          </p>
          <h1 className="font-bold">About Investment Dashboard</h1>
          <p>
            In the Investment dashboard, you can see a search bar to search a
            investment of a specific item. If you want to change the invested
            amount to re-add the Investment amount you can Press the Edit Invest
            Amount. Below the button there is info bar where there is date,
            Invested Amount and Number of products. Below the bar you can see
            the Line graph and Circular graph which represents the different
            Data’s. Below the bar Section there are list of Products and amount
            that you have invested in particular Product.
          </p>
          <h1 className="font-bold">About Sales Dashboard</h1>
          <p>
            In the Investment dashboard, you can see a search bar to search a
            sales of a specific item. Below the search bar there is info which
            holds the Date, the amount that you made from selling products and
            Sales report where you can preview the sales report, download the
            report and delete the particular report. Below the info bar there is
            Line graph and circular chart which show the result of Sales
            performance. Below the Line bar and Circular chart there are list of
            Products sales Detail like Profit etc.
          </p>
        </div>
      </div>
    </Layout>
  );
}
