"""
PDF AI screening report generator using reportlab.

Turns the detection results into a clean, clinician-friendly PDF report.
"""
import os
import uuid
from datetime import datetime
from typing import Dict, List, Any, Optional

from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle, PageBreak
from reportlab.platypus.flowables import HRFlowable
from reportlab.lib.enums import TA_CENTER, TA_LEFT

KNOWN_FINDING_CLASSES = {"fracture", "metal"}

DISCLAIMER = (
    "This AI-generated report is for preliminary screening support only and is "
    "not a medical diagnosis. Please consult a qualified radiologist or doctor "
    "for final interpretation."
)

ICONS_DIR = os.path.join("app", "static", "icons")

def _confidence_level(pct: float) -> str:
    if pct >= 70: return "High"
    if pct >= 40: return "Medium"
    return "Low"

def _region_words(bbox: List[float], width: int, height: int) -> str:
    try:
        x1, y1, x2, y2 = [float(v) for v in bbox]
        if width <= 0 or height <= 0: raise ValueError
        xc = (x1 + x2) / 2.0 / width
        yc = (y1 + y2) / 2.0 / height
    except Exception:
        return "highlighted area on uploaded X-ray"

    if yc < 0.50:
        vertical = "upper wrist area"
    elif yc > 0.70:
        vertical = "lower wrist area"
    else:
        vertical = "center region"

    if xc < 0.40: horizontal = "left side"
    elif xc > 0.60: horizontal = "right side"
    else: horizontal = None

    region = f"{vertical}, {horizontal}" if horizontal else vertical
    return region

def _status_for(class_name: str, detections: List[Dict[str, Any]]) -> str:
    confs = [float(d["confidence"]) for d in detections if d.get("class_name") == class_name]
    if not confs: return "Not Detected"
    best = max(confs)
    if best >= 0.40: return "Detected"
    return "Low-confidence suspicion"

def _get_icon(name, width, height):
    path = os.path.join(ICONS_DIR, f"{name}.png")
    if os.path.exists(path):
        return Image(path, width=width, height=height)
    return ""

def generate_pdf_report(
    detections_detailed: List[Dict[str, Any]],
    image_size: Dict[str, int],
    original_filename: str,
    processed_image_path: str,
    report_path: str,
    heatmap_path: Optional[str] = None,
    patient_name: Optional[str] = None,
    image_quality_ok: bool = True,
    analyzed_at: Optional[datetime] = None,
    report_id: Optional[str] = None,
) -> str:
    now = analyzed_at or datetime.now()
    rid = report_id or f"WFMD-{now.strftime('%Y%m%d')}-{uuid.uuid4().hex[:8].upper()}"

    findings = [d for d in detections_detailed if str(d.get("class_name", "")).lower() in KNOWN_FINDING_CLASSES]

    W = int(image_size.get("width", 0))
    H = int(image_size.get("height", 0))

    fracture_status = _status_for("fracture", findings)
    metal_status = _status_for("metal", findings)

    urgency_color_hex = "#E53E3E" # Red by default
    if fracture_status == "Detected" and metal_status == "Detected":
        overall = "The AI model identified both a possible fracture and a metal/implant-like structure in the wrist X-ray."
        urgency = "High (Immediate medical consultation recommended)"
    elif fracture_status == "Detected":
        overall = "The AI model identified a possible fracture in the wrist X-ray."
        urgency = "High (Immediate medical consultation recommended)"
    elif metal_status == "Detected":
        overall = "The AI model identified a metal/implant-like structure in the wrist X-ray."
        urgency = "Medium (Clinical history review recommended)"
        urgency_color_hex = "#DD6B20"
    elif "Low-confidence suspicion" in (fracture_status, metal_status):
        overall = "The AI model found low-confidence signs that may need a closer look by a professional."
        urgency = "Low (Routine checkup recommended)"
        urgency_color_hex = "#D69E2E"
    else:
        overall = "The AI model did not detect a clear fracture or metal-like structure in the wrist X-ray."
        urgency = "Normal"
        urgency_color_hex = "#38A169"

    # Set up Document
    doc = SimpleDocTemplate(
        report_path,
        pagesize=A4,
        rightMargin=30, leftMargin=30,
        topMargin=30, bottomMargin=30,
        title="Detection Report"
    )
    elements = []
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle('TitleStyle', parent=styles['Heading1'], fontSize=16, textColor=colors.HexColor("#1A365D"), alignment=TA_CENTER)
    h2_style = ParagraphStyle('H2Style', parent=styles['Heading2'], fontSize=12, textColor=colors.HexColor("#1A365D"), spaceAfter=10, spaceBefore=0)
    normal_style = styles['Normal']
    normal_style.fontSize = 10
    normal_style.textColor = colors.HexColor("#2D3748")
    
    header_title_style = ParagraphStyle('HeaderTitle', parent=styles['Heading1'], fontSize=16, leading=22, textColor=colors.HexColor("#1A365D"))

    blue_text = ParagraphStyle('BlueText', parent=normal_style, textColor=colors.HexColor("#2B6CB0"))
    gray_text = ParagraphStyle('GrayText', parent=normal_style, textColor=colors.HexColor("#718096"), fontSize=9)
    
    # ---------------- HEADER ----------------
    logo_path = os.path.join("app", "static", "new_logo.png")
    if not os.path.exists(logo_path):
        logo_path = os.path.join("app", "static", "logo.png")
        
    img_element = ""
    if os.path.exists(logo_path):
        from reportlab.lib.utils import ImageReader
        img_reader = ImageReader(logo_path)
        iw, ih = img_reader.getSize()
        aspect = iw / float(ih)
        new_h = 50
        new_w = new_h * aspect
        img_element = Image(logo_path, width=new_w, height=new_h)
        
    ai_box = Table([
        [_get_icon("clipboard_plus", 24, 24), Paragraph("<b><font color='#2B6CB0'>AI-POWERED</font></b><br/><font size=8 color='#718096'>ACCURATE. RELIABLE. FAST.</font>", normal_style)]
    ], colWidths=[35, 120])
    ai_box.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE')]))

    header_data = [[
        img_element, 
        Paragraph("<b>Wrist Fracture and<br/>Metal Detection System</b><br/><font size=11 color='#718096'>AI X-Ray Screening</font>", header_title_style),
        ai_box
    ]]
    
    header_table = Table(header_data, colWidths=[60, 3.5*inch, 2.5*inch])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (2,0), (2,0), 'RIGHT'),
    ]))
    elements.append(header_table)
    elements.append(Spacer(1, 0.1*inch))
    elements.append(HRFlowable(width="100%", color=colors.HexColor("#2B6CB0"), thickness=1))
    elements.append(Spacer(1, 0.1*inch))

    # ---------------- PATIENT INFO ----------------
    p_name = patient_name or "Not provided"
    upload_date = now.strftime('%d %b %Y, %I:%M %p')
    
    info_data = [
        [_get_icon("patient", 20, 20), Paragraph(f"<font color='#718096'>Patient Name:</font> <font color='#2B6CB0'>{p_name}</font>", normal_style),
         _get_icon("clipboard", 20, 20), Paragraph(f"<font color='#718096'>Report ID:</font><br/><font color='#2B6CB0'>{rid}</font>", normal_style)],
         
        [_get_icon("image", 20, 20), Paragraph(f"<font color='#718096'>Image:</font> <font color='#2B6CB0'>{original_filename}</font>", normal_style),
         _get_icon("calendar", 20, 20), Paragraph(f"<font color='#718096'>Reported on:</font><br/><font color='#2B6CB0'>{upload_date}</font>", normal_style)]
    ]
    info_table = Table(info_data, colWidths=[30, 2.7*inch, 30, 2.7*inch])
    info_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('INNERGRID', (0,0), (-1,-1), 0, colors.transparent), # hide grid
        ('LINEAFTER', (1,0), (1,1), 0.5, colors.HexColor("#E2E8F0")), # vertical line between columns
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
    ]))
    elements.append(info_table)
    elements.append(Spacer(1, 0.2*inch))

    # ---------------- REPORT TITLE ----------------
    title_data = [[
        HRFlowable(width="100%", color=colors.HexColor("#2B6CB0"), thickness=2),
        Paragraph("<b>X-RAY WRIST JOINT REPORT</b>", title_style),
        HRFlowable(width="100%", color=colors.HexColor("#2B6CB0"), thickness=2)
    ]]
    title_table = Table(title_data, colWidths=[1.5*inch, 3.5*inch, 1.5*inch])
    title_table.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE')]))
    elements.append(title_table)
    elements.append(Spacer(1, 0.2*inch))

    # ---------------- IMAGE & DETAILS ----------------
    img_element = ""
    if os.path.exists(processed_image_path):
        try:
            p_img = Image(processed_image_path)
            max_width = 3.5 * inch
            max_height = 3.5 * inch
            aspect = p_img.imageWidth / float(p_img.imageHeight)
            if p_img.imageWidth > max_width or p_img.imageHeight > max_height:
                if (max_width / aspect) <= max_height:
                    p_img.drawWidth = max_width
                    p_img.drawHeight = max_width / aspect
                else:
                    p_img.drawHeight = max_height
                    p_img.drawWidth = max_height * aspect
            p_img.hAlign = 'LEFT'
            
            # Wrap image in a table for border and dark background like in the image
            img_wrapper = Table([[p_img]], colWidths=[3.7*inch], rowHeights=[3.7*inch])
            img_wrapper.setStyle(TableStyle([
                ('ALIGN', (0,0), (-1,-1), 'CENTER'),
                ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
                ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#1A202C")),
                ('BOX', (0,0), (-1,-1), 1, colors.black)
            ]))
            img_element = img_wrapper
        except Exception:
            pass

    details_flowables = [
        Table([
            [_get_icon("document", 24, 24), Paragraph("<b><font color='#2B6CB0'>STUDY</font></b><br/>Wrist Joint X-Ray", normal_style)]
        ], colWidths=[40, 2*inch]),
        Spacer(1, 0.1*inch),
        HRFlowable(width="100%", color=colors.HexColor("#E2E8F0")),
        Spacer(1, 0.1*inch),
        Table([
            [_get_icon("target", 24, 24), Paragraph("<b><font color='#2B6CB0'>FOCUS AREA</font></b><br/>Distal Radius (Lower Wrist)", normal_style)]
        ], colWidths=[40, 2*inch]),
        Spacer(1, 0.1*inch),
        HRFlowable(width="100%", color=colors.HexColor("#E2E8F0")),
        Spacer(1, 0.1*inch),
        Table([
            [_get_icon("shield", 24, 24), Paragraph("<b><font color='#2B6CB0'>VIEW</font></b><br/>PA View", normal_style)]
        ], colWidths=[40, 2*inch])
    ]
    
    details_table = Table([[details_flowables]], colWidths=[2.8*inch])
    details_table.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('PADDING', (0,0), (-1,-1), 15),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE')
    ]))

    img_and_details = Table([[img_element, details_table]], colWidths=[4*inch, 3*inch])
    img_and_details.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP')]))
    elements.append(img_and_details)
    elements.append(Spacer(1, 0.2*inch))

    # ---------------- IMPRESSION & FINDINGS ----------------
    findings_content = []
    
    # Title
    findings_content.append(Table([
        [_get_icon("clipboard", 24, 24), Paragraph("<b>IMPRESSION & FINDINGS</b>", h2_style)]
    ], colWidths=[35, 6*inch]))
    findings_content.append(Spacer(1, 0.05*inch))
    findings_content.append(HRFlowable(width="100%", color=colors.HexColor("#E2E8F0")))
    findings_content.append(Spacer(1, 0.1*inch))
    
    # Urgency
    urgency_text = f"<font color='{urgency_color_hex}'><b>Urgency / Severity: {urgency}</b></font>"
    urgency_table = Table([
        [_get_icon("warning", 24, 24), Paragraph(urgency_text, normal_style)]
    ], colWidths=[35, 6*inch])
    urgency_table.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE')]))
    findings_content.append(urgency_table)
    findings_content.append(Spacer(1, 0.1*inch))
    
    # Overall
    overall_table = Table([
        [_get_icon("info", 24, 24), Paragraph(f"<b><font color='#2B6CB0'>Overall:</font></b> {overall}", normal_style)]
    ], colWidths=[35, 6*inch])
    overall_table.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE')]))
    findings_content.append(overall_table)
    findings_content.append(Spacer(1, 0.1*inch))
    
    # Specific Findings
    if findings:
        for i, d in enumerate(findings, 1):
            pct = float(d["confidence"]) * 100.0
            region = _region_words(d.get("bbox", []), W, H)
            finding_text = f"<b><font color='#2B6CB0'>{str(d['class_name']).capitalize()}</font></b> - Confidence: <b>{pct:.1f}% ({_confidence_level(pct)})</b> | Region: {region}"
            finding_table = Table([
                [_get_icon("info", 24, 24), Paragraph(finding_text, normal_style)]
            ], colWidths=[35, 6*inch])
            finding_table.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE')]))
            findings_content.append(finding_table)
            findings_content.append(Spacer(1, 0.05*inch))
    else:
        finding_table = Table([
            [_get_icon("check", 24, 24), Paragraph("No abnormalities detected based on AI screening.", normal_style)]
        ], colWidths=[35, 6*inch])
        finding_table.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE')]))
        findings_content.append(finding_table)

    findings_box = Table([[findings_content]], colWidths=[7*inch])
    findings_box.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('PADDING', (0,0), (-1,-1), 15),
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F7FAFC")) # Very light gray/blue
    ]))
    elements.append(findings_box)
    elements.append(Spacer(1, 0.2*inch))

    # ---------------- RECOMMENDED NEXT STEPS ----------------
    steps_content = []
    steps_content.append(Table([
        [_get_icon("trending", 24, 24), Paragraph("<b><font color='#276749'>RECOMMENDED NEXT STEPS</font></b>", ParagraphStyle('GreenH2', parent=h2_style, textColor=colors.HexColor("#276749")))]
    ], colWidths=[35, 6*inch]))
    steps_content.append(Spacer(1, 0.05*inch))
    steps_content.append(HRFlowable(width="100%", color=colors.HexColor("#C6F6D5")))
    steps_content.append(Spacer(1, 0.1*inch))
    
    recommendations = []
    if fracture_status in ("Detected", "Low-confidence suspicion"):
        recommendations.extend([
            "Immobilize the wrist, apply ice if swollen.",
            "Avoid lifting heavy objects.",
            "Schedule an immediate review with an orthopedic specialist."
        ])
    if metal_status in ("Detected", "Low-confidence suspicion"):
        recommendations.append("Inform your MRI technician about this finding if an MRI is scheduled.")
    if not (fracture_status in ("Detected", "Low-confidence suspicion") or metal_status in ("Detected", "Low-confidence suspicion")):
        recommendations.append("If pain persists, seek clinical evaluation as AI screening is not definitive.")
        
    for rec in recommendations:
        steps_content.append(Table([
            [_get_icon("check", 16, 16), Paragraph(rec, normal_style)]
        ], colWidths=[25, 6*inch]))
        steps_content.append(Spacer(1, 0.05*inch))

    steps_box = Table([[steps_content]], colWidths=[7*inch])
    steps_box.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#C6F6D5")),
        ('PADDING', (0,0), (-1,-1), 15),
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#F0FFF4")) # Very light green
    ]))
    elements.append(steps_box)
    elements.append(Spacer(1, 0.2*inch))

    # ---------------- IMAGE QUALITY ----------------
    quality_note = (
        "Image quality appears acceptable for AI screening."
        if image_quality_ok else
        "Image quality may not be sufficient for reliable AI screening."
    )
    quality_box = Table([
        [_get_icon("shield", 24, 24), Paragraph(f"<b><font color='#2B6CB0'>Image Quality:</font></b> {quality_note}", normal_style)]
    ], colWidths=[35, 6.5*inch])
    quality_box.setStyle(TableStyle([
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#BEE3F8")),
        ('PADDING', (0,0), (-1,-1), 10),
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#EBF8FF")), # Very light blue
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE')
    ]))
    elements.append(quality_box)
    elements.append(Spacer(1, 0.4*inch))

    # ---------------- DISCLAIMER ----------------
    elements.append(HRFlowable(width="100%", color=colors.HexColor("#E2E8F0"), thickness=1))
    elements.append(Spacer(1, 0.1*inch))
    
    disclaimer_table = Table([[
        Paragraph(DISCLAIMER, ParagraphStyle('Disclaimer', parent=normal_style, fontSize=8, textColor=colors.gray))
    ]])
    elements.append(disclaimer_table)

    doc.build(elements)
    return report_path
