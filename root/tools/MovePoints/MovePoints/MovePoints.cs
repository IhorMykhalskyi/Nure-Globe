using System;
using System.Globalization;
using System.Text.RegularExpressions;
using System.Windows.Forms;

namespace MovePoints
{
    public partial class MovePoints : Form
    {
        public MovePoints()
        {
            InitializeComponent();
        }

        private void MovePoints_Load(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            richTextBox2.Text = "";

            string text = richTextBox1.Text;

            string coord = @"\d[\d|\.]*";

            string pattern = "(\".+\\s?\\[)(" + coord + "),\\s?(" + coord + ")(,.+\\])";

            foreach (Match match in Regex.Matches(text, pattern))
            {
                double x = Convert.ToDouble(match.Groups[2].Value, CultureInfo.InvariantCulture) + (int)numericUpDown1.Value;
                double y = Convert.ToDouble(match.Groups[3].Value, CultureInfo.InvariantCulture) + (int)numericUpDown2.Value;

                string line = match.Groups[1].Value + x.ToString(new CultureInfo("en-US")) + "," + y.ToString(new CultureInfo("en-US")) + match.Groups[4].Value + ",\n"; 
                richTextBox2.AppendText(line);
            }
        }

        private void numericUpDown1_ValueChanged(object sender, EventArgs e)
        {

        }
    }
}
