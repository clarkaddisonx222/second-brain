#!/usr/bin/env python3
"""
Psalm 4 Chord Chart PDF Generator
Two-column format for worship resources
"""

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_CENTER, TA_LEFT

def create_chord_chart():
    # Create PDF
    pdf_path = "/home/scott/.openclaw/workspace/second-brain/content/work/projects/pray150-psalter/review/Psalm-004-REVIEW.pdf"
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=0.5*inch,
        leftMargin=0.5*inch,
        topMargin=0.5*inch,
        bottomMargin=0.5*inch
    )
    
    # Container for elements
    elements = []
    
    # Styles
    styles = getSampleStyleSheet()
    
    # Custom styles
    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Title'],
        fontSize=24,
        fontName='Helvetica-Bold',
        spaceAfter=6,
        alignment=TA_CENTER
    )
    
    subtitle_style = ParagraphStyle(
        'SubtitleStyle',
        parent=styles['Normal'],
        fontSize=12,
        fontName='Helvetica-Oblique',
        spaceAfter=6,
        alignment=TA_CENTER
    )
    
    info_style = ParagraphStyle(
        'InfoStyle',
        parent=styles['Normal'],
        fontSize=10,
        fontName='Helvetica',
        spaceAfter=12,
        alignment=TA_CENTER
    )
    
    section_style = ParagraphStyle(
        'SectionStyle',
        parent=styles['Heading2'],
        fontSize=12,
        fontName='Helvetica-Bold',
        spaceBefore=12,
        spaceAfter=6,
        textColor=colors.HexColor('#2C3E50')
    )
    
    chord_style = ParagraphStyle(
        'ChordStyle',
        parent=styles['Normal'],
        fontSize=11,
        fontName='Helvetica-Bold',
        textColor=colors.HexColor('#C0392B'),
        spaceAfter=2
    )
    
    lyric_style = ParagraphStyle(
        'LyricStyle',
        parent=styles['Normal'],
        fontSize=11,
        fontName='Helvetica',
        spaceAfter=8
    )
    
    # Title Block
    elements.append(Paragraph("Psalm 4", title_style))
    elements.append(Paragraph("In Peace I Will Lie Down and Sleep", subtitle_style))
    elements.append(Paragraph("Key: G Major | Tempo: ~60 BPM | Time: 4/4", info_style))
    elements.append(Spacer(1, 0.2*inch))
    
    # Two-column layout using table
    # Left column content
    left_content = []
    
    # Intro
    left_content.append([Paragraph("Intro", section_style)])
    left_content.append([Paragraph("<b>G</b>  <b>D/F#</b>  <b>Em</b>  <b>C</b>  (2x)", lyric_style)])
    left_content.append([Spacer(1, 0.1*inch)])
    
    # Verse 1
    left_content.append([Paragraph("Verse 1", section_style)])
    left_content.append([Paragraph("<b>G</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>D/F#</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Em</b>", chord_style)])
    left_content.append([Paragraph("Answer me when I call to you,", lyric_style)])
    left_content.append([Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>C</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>G</b>", chord_style)])
    left_content.append([Paragraph("my righteous God.", lyric_style)])
    left_content.append([Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>D/F#</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Em</b>", chord_style)])
    left_content.append([Paragraph("Give me relief from my distress;", lyric_style)])
    left_content.append([Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>C</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>D</b>", chord_style)])
    left_content.append([Paragraph("have mercy on me and hear my prayer.", lyric_style)])
    left_content.append([Spacer(1, 0.1*inch)])
    
    # Verse 2
    left_content.append([Paragraph("Verse 2", section_style)])
    left_content.append([Paragraph("<b>G</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>D/F#</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Em</b>", chord_style)])
    left_content.append([Paragraph("How long will you people turn my glory", lyric_style)])
    left_content.append([Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>C</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>G</b>", chord_style)])
    left_content.append([Paragraph("into shame?", lyric_style)])
    left_content.append([Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>D/F#</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Em</b>", chord_style)])
    left_content.append([Paragraph("How long will you love delusions", lyric_style)])
    left_content.append([Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;<b>C</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>D</b>", chord_style)])
    left_content.append([Paragraph("and seek false gods?", lyric_style)])
    left_content.append([Spacer(1, 0.1*inch)])
    
    # Chorus
    left_content.append([Paragraph("Chorus", section_style)])
    left_content.append([Paragraph("<b>C</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>G</b>", chord_style)])
    left_content.append([Paragraph("Know that the Lord has set apart", lyric_style)])
    left_content.append([Paragraph("<b>D/F#</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Em</b>", chord_style)])
    left_content.append([Paragraph("his faithful servant for himself;", lyric_style)])
    left_content.append([Paragraph("<b>C</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>G</b>", chord_style)])
    left_content.append([Paragraph("the Lord hears when I", lyric_style)])
    left_content.append([Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;<b>D/F#</b>&nbsp;&nbsp;&nbsp;&nbsp;<b>Em</b>", chord_style)])
    left_content.append([Paragraph("call to him.", lyric_style)])
    left_content.append([Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;<b>C</b>&nbsp;&nbsp;&nbsp;&nbsp;<b>D</b>", chord_style)])
    left_content.append([Paragraph("[To Verse]", lyric_style)])
    
    # Right column content
    right_content = []
    
    # Verse 3
    right_content.append([Paragraph("Verse 3", section_style)])
    right_content.append([Paragraph("<b>G</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>D/F#</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Em</b>", chord_style)])
    right_content.append([Paragraph("Tremble and do not sin;", lyric_style)])
    right_content.append([Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>C</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>G</b>", chord_style)])
    right_content.append([Paragraph("when you are on your beds,", lyric_style)])
    right_content.append([Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>D/F#</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Em</b>", chord_style)])
    right_content.append([Paragraph("search your hearts and be silent.", lyric_style)])
    right_content.append([Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>C</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>D</b>", chord_style)])
    right_content.append([Paragraph("Offer the sacrifices of the righteous", lyric_style)])
    right_content.append([Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;<b>G</b>", chord_style)])
    right_content.append([Paragraph("and trust in the Lord.", lyric_style)])
    right_content.append([Spacer(1, 0.1*inch)])
    
    # Verse 4
    right_content.append([Paragraph("Verse 4", section_style)])
    right_content.append([Paragraph("<b>G</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>D/F#</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Em</b>", chord_style)])
    right_content.append([Paragraph('Many, Lord, are asking, "Who will bring', lyric_style)])
    right_content.append([Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>C</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>G</b>", chord_style)])
    right_content.append([Paragraph('us prosperity?"', lyric_style)])
    right_content.append([Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>D/F#</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Em</b>", chord_style)])
    right_content.append([Paragraph("Let the light of your face shine on us.", lyric_style)])
    right_content.append([Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>D/F#</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Em</b>", chord_style)])
    right_content.append([Paragraph("Fill my heart with joy when", lyric_style)])
    right_content.append([Paragraph("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>C</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>D</b>", chord_style)])
    right_content.append([Paragraph("their grain and new wine abound.", lyric_style)])
    right_content.append([Spacer(1, 0.1*inch)])
    
    # Bridge
    right_content.append([Paragraph("Bridge (2x)", section_style)])
    right_content.append([Paragraph("<b>C</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>G</b>", chord_style)])
    right_content.append([Paragraph("In peace I will lie down and sleep,", lyric_style)])
    right_content.append([Paragraph("<b>D/F#</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Em</b>", chord_style)])
    right_content.append([Paragraph("for you alone, Lord,", lyric_style)])
    right_content.append([Paragraph("<b>C</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>G</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>D/F#</b>&nbsp;&nbsp;&nbsp;<b>Em</b>", chord_style)])
    right_content.append([Paragraph("make me dwell in safety.", lyric_style)])
    right_content.append([Paragraph("<b>C</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>G</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>D/F#</b>&nbsp;&nbsp;&nbsp;<b>Em</b>&nbsp;&nbsp;&nbsp;&nbsp;<b>C</b>&nbsp;&nbsp;&nbsp;&nbsp;<b>D</b>&nbsp;&nbsp;&nbsp;&nbsp;<b>G</b>", chord_style)])
    right_content.append([Paragraph("make me dwell in safe—ty.", lyric_style)])
    right_content.append([Spacer(1, 0.1*inch)])
    
    # Chord Reference
    right_content.append([Paragraph("Chord Reference", section_style)])
    ref_data = [
        [Paragraph("<b>G</b>", chord_style), Paragraph("320003", lyric_style)],
        [Paragraph("<b>D/F#</b>", chord_style), Paragraph("200232", lyric_style)],
        [Paragraph("<b>Em</b>", chord_style), Paragraph("022000", lyric_style)],
        [Paragraph("<b>C</b>", chord_style), Paragraph("x32010", lyric_style)],
        [Paragraph("<b>D</b>", chord_style), Paragraph("xx0232", lyric_style)],
    ]
    ref_table = Table(ref_data, colWidths=[1*inch, 1.5*inch])
    ref_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 2),
    ]))
    right_content.append([ref_table])
    
    # Create two-column layout
    # Flatten content lists
    left_flat = []
    for item in left_content:
        left_flat.extend(item)
    
    right_flat = []
    for item in right_content:
        right_flat.extend(item)
    
    # Pad shorter column
    max_len = max(len(left_flat), len(right_flat))
    while len(left_flat) < max_len:
        left_flat.append(Spacer(1, 0.1*inch))
    while len(right_flat) < max_len:
        right_flat.append(Spacer(1, 0.1*inch))
    
    # Create table with two columns
    table_data = []
    for i in range(max_len):
        table_data.append([left_flat[i], right_flat[i]])
    
    col_width = (doc.width - 0.3*inch) / 2
    two_col_table = Table(table_data, colWidths=[col_width, col_width], hAlign='CENTER')
    two_col_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (0, -1), 0),
        ('RIGHTPADDING', (0, 0), (0, -1), 0.15*inch),
        ('LEFTPADDING', (1, 0), (1, -1), 0.15*inch),
        ('RIGHTPADDING', (1, 0), (1, -1), 0),
    ]))
    
    elements.append(two_col_table)
    
    # Footer
    elements.append(Spacer(1, 0.3*inch))
    footer_style = ParagraphStyle(
        'FooterStyle',
        parent=styles['Normal'],
        fontSize=8,
        fontName='Helvetica-Oblique',
        alignment=TA_CENTER,
        textColor=colors.gray
    )
    elements.append(Paragraph("For the Pray150 Psalter Project | South Florida Presbyterian Church", footer_style))
    
    # Build PDF
    doc.build(elements)
    print(f"PDF created successfully: {pdf_path}")

if __name__ == "__main__":
    create_chord_chart()
