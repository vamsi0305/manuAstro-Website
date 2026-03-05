import jsPDF from 'jspdf'

export const generateInvoice = (order: any) => {
    const doc = new jsPDF()

    // Header
    doc.setFontSize(22)
    doc.setTextColor(122, 48, 18)
    doc.text('ManuAstro', 20, 25)

    doc.setFontSize(10)
    doc.setTextColor(92, 51, 23)
    doc.text('Vedic Sciences', 20, 32)
    doc.text('TAX INVOICE', 160, 25)
    doc.text(`Invoice #: INV-${order.id}`, 160, 32)
    doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 160, 38)

    // Divider
    doc.setDrawColor(201, 151, 42)
    doc.line(20, 45, 190, 45)

    // Bill To
    doc.setFontSize(11)
    doc.setTextColor(58, 31, 13)
    doc.text('Bill To:', 20, 55)
    doc.setFontSize(10)
    doc.text(order.user?.name || order.user?.full_name || 'Customer', 20, 62)
    doc.text(order.user?.email || '', 20, 68)
    doc.text(order.shipping_address || '', 20, 74)

    // Table header
    doc.line(20, 85, 190, 85)
    doc.setFontSize(10)
    doc.text('Item', 20, 93)
    doc.text('Qty', 130, 93)
    doc.text('Price', 155, 93)
    doc.text('Total', 175, 93)
    doc.line(20, 97, 190, 97)

    // Items
    let y = 105
    const items = order.items || order.order_items || []
    items.forEach((item: any) => {
        const name = item.product?.name || item.name || 'Product'
        const qty = item.quantity
        const price = item.price || item.price_at_purchase || 0
        doc.text(name.substring(0, 35), 20, y)
        doc.text(String(qty), 130, y)
        doc.text(`Rs.${price.toLocaleString('en-IN')}`, 150, y)
        doc.text(`Rs.${(qty * price).toLocaleString('en-IN')}`, 172, y)
        y += 8
    })

    // Total
    doc.line(20, y + 3, 190, y + 3)
    doc.setFontSize(11)
    const total = order.total_amount || order.total || 0
    doc.text(`Total: Rs.${total.toLocaleString('en-IN')}`, 150, y + 12)

    // Footer
    doc.setFontSize(8)
    doc.setTextColor(156, 110, 58)
    doc.text('Thank you for choosing ManuAstro. May the stars guide you.', 20, 280)

    doc.save(`ManuAstro_Invoice_${order.id}.pdf`)
}
